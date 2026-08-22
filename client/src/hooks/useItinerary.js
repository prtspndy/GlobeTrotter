import { useTrip } from '../context/TripContext';

export const useItinerary = (tripId) => {
  const { getTrip, addCityStop, addActivityToDay, deleteActivity } = useTrip();
  const trip = getTrip(tripId);

  return {
    trip,
    stops: trip?.stops || [],
    addStop: (cityId) => addCityStop(tripId, cityId),
    addActivity: (stopId, dayNum, actData) => addActivityToDay(tripId, stopId, dayNum, actData),
    removeActivity: (stopId, dayNum, actId) => deleteActivity(tripId, stopId, dayNum, actId)
  };
};
