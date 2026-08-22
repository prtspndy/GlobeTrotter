import { useTrip as useTripContext } from '../context/TripContext';

export const useTrips = () => {
  return useTripContext();
};
