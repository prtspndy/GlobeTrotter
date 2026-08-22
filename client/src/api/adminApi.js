import axiosClient from './axiosClient';

export const adminApi = {
  getAnalytics: () => axiosClient.get('/admin/analytics')
};
