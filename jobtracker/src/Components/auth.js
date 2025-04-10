import axios from 'axios';

// Backend base URL (correct path)
const API_URL = 'https://jobtracker-cvx5.onrender.com/api';

// Just log login attempt (no token handling)
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/applications`, {
      email,
      password,
    });

    return response.data; // Expected: { message: 'Login attempt stored' }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login attempt failed');
  }
};

// Call the register function properly
const handleLogin = async (email, password) => {
  try {
    const result = await register(email, password);
    alert(result.message || 'Login attempt recorded!');
  } catch (err) {
    alert(err.message);
  }
};


