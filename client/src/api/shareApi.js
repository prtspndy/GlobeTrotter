import axiosClient from './axiosClient';

export const shareApi = {
  createShareLink: (tripId) => axiosClient.post(`/trips/${tripId}/share`),
  getPublicTrip: (shareId) => axiosClient.get(`/public/trips/${shareId}`),
  copyPublicTrip: (shareId) => axiosClient.post(`/public/trips/${shareId}/copy`)
};
