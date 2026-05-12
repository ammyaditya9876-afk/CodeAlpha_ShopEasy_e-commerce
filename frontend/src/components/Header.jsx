import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SearchBox from './SearchBox';
import './Header.css';

const Header = () => {
  const { userInfo, logout } = useAuth();

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <h2>ShopEasy</h2>
        </Link>
        <SearchBox />
        <nav className="nav-links">
          <Link to="/cart" className="nav-link">
            <FaShoppingCart /> Cart
          </Link>
          {userInfo ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/profile" className="nav-link">
                <FaUser /> {userInfo.name}
              </Link>
              {userInfo.isAdmin && (
                <Link to="/admin/productlist" className="nav-link" style={{ color: 'var(--color-secondary)' }}>
                  Admin
                </Link>
              )}
              <button onClick={logout} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              <FaUser /> Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
