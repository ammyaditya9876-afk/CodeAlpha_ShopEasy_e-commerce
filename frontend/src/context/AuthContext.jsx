import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );
  const [loading, setLoading] = useState(true);

  // Axios Interceptor to attach Firebase Token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (config) => {
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Sync with backend to get MongoDB user info (like isAdmin)
        try {
          const token = await user.getIdToken();
          const { data } = await axios.post('/api/users/auth', { 
            name: user.displayName || user.email.split('@')[0], 
            email: user.email 
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserInfo(data);
          localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (error) {
          console.error("Backend sync failed", error);
        }
      } else {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateFirebaseProfile(userCredential.user, { displayName: name });
      
      // Force trigger state change sync
      const token = await userCredential.user.getIdToken();
      const { data } = await axios.post('/api/users/auth', { name, email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (name, email, password) => {
    try {
      if (auth.currentUser) {
        if (name) await updateFirebaseProfile(auth.currentUser, { displayName: name });
        // Password update and email update require re-authentication usually, skipped for brevity
        const { data } = await axios.put('/api/users/profile', { name, email, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserInfo(null);
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
