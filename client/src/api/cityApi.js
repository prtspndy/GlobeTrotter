import axiosClient from './axiosClient';

export const cityApi = {
  getAll: (params) => axiosClient.get('/cities', { params }),
  getById: (id) => axiosClient.get(`/cities/${id}`)
};
