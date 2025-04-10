import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, userEmail }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">JTracker</Link>
      </div>
      <div className="navbar-links">
        {/* Always show Home link */}
        <Link to="/" className="nav-link">Home</Link>
        
        {/* Show these links only when logged in */}
        {isLoggedIn ? (
          <>
            <Link to="/applications" className="nav-link">Add job Applications</Link>
  
          </>
        ) : (
          // Show only Home link when not logged in
          null
        )}
      </div>
    </nav>
  );
};

export default Navbar;