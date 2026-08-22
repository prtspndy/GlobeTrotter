import axiosClient from './axiosClient';

export const itineraryApi = {
  addStop: (tripId, stopData) => axiosClient.post(`/trips/${tripId}/stops`, stopData),
  addActivity: (tripId, stopId, dayNum, actData) => axiosClient.post(`/trips/${tripId}/stops/${stopId}/days/${dayNum}/activities`, actData),
  removeActivity: (tripId, stopId, dayNum, actId) => axiosClient.delete(`/trips/${tripId}/stops/${stopId}/days/${dayNum}/activities/${actId}`)
};
