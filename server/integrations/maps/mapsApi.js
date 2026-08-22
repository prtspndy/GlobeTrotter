const getRouteCoordinates = async (origin, destination) => {
  return { origin, destination, distanceKm: 450, durationHours: 4.5 };
};

module.exports = { getRouteCoordinates };
