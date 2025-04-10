import axios from 'axios';

// Base backend URL
const API_URL = 'https://jobtracker-cvx5.onrender.com/api/applications';

// Log login attempt (no auth, just store in DB)
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      email,
      password
    });

    return response.data; // { message: 'Login attempt stored' }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login attempt failed');
  }
};
