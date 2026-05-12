import User from '../models/userModel.js';
import firebaseAdmin from '../config/firebase-admin.js';

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      req.user = await User.findOne({ email: decodedToken.email }).select('-password');
      if (!req.user) {
        // Auto-create user if they don't exist in MongoDB yet
        req.user = await User.create({
          name: decodedToken.name || decodedToken.email.split('@')[0],
          email: decodedToken.email,
          password: 'firebase-auth-managed', // Dummy password
        });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
