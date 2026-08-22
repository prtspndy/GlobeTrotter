import axiosClient from './axiosClient';

export const activityApi = {
  getAll: (params) => axiosClient.get('/activities', { params }),
  getById: (id) => axiosClient.get(`/activities/${id}`)
};
