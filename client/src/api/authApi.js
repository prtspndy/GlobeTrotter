import axiosClient from './axiosClient';

export const authApi = {
  login: (credentials) => axiosClient.post('/auth/login', credentials),
  register: (userData) => axiosClient.post('/auth/register', userData),
  googleLogin: (idToken) => axiosClient.post('/auth/google', { idToken }),
  forgotPassword: (email) => axiosClient.post('/auth/forgot-password', { email }),
  resetPassword: (data) => axiosClient.post('/auth/reset-password', data),
  getMe: () => axiosClient.get('/auth/me'),
  logout: () => axiosClient.post('/auth/logout')
};
