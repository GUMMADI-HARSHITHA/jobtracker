import axios from 'axios';

const API_URL = 'https://jobtracker-cvx5.onrender.com';

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration/login failed');
  }
};
