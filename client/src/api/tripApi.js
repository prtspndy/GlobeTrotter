import axiosClient from './axiosClient';

export const tripApi = {
  getAll: () => axiosClient.get('/trips'),
  getById: (id) => axiosClient.get(`/trips/${id}`),
  create: (tripData) => axiosClient.post('/trips', tripData),
  update: (id, tripData) => axiosClient.put(`/trips/${id}`, tripData),
  delete: (id) => axiosClient.delete(`/trips/${id}`)
};
