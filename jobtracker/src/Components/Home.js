import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from './auth'; 
import './Home.css';

const Home = ({ isLoggedIn, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await register(email, password);

      // No token check required
      onLogin(email);
      alert(response.message || 'Login attempt recorded!');
      navigate('/applications');
    } catch (err) {
      setError(err.message || 'Login attempt failed');
    }
  };

  return (
    <div className="home-container">
      <div className="auth-section">
        <div className="auth-card">
          <h2>Welcome</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="submit-button" type="submit">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
