import { useState, useEffect } from 'react';
import { reverseGeocodeLocation } from '../services/geoapifyService';

export function useUserLocation() {
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('globetrotter_user_location');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const geoInfo = await reverseGeocodeLocation({ lat: latitude, lon: longitude });
          const locationData = {
            lat: latitude,
            lon: longitude,
            city: geoInfo?.city || 'Current City',
            state: geoInfo?.state || '',
            country: geoInfo?.country || 'India',
            formatted: geoInfo?.formatted || 'Detected Location'
          };
          setLocation(locationData);
          localStorage.setItem('globetrotter_user_location', JSON.stringify(locationData));
        } catch (err) {
          setError('Failed to fetch city name for coordinates.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location permission denied. Please allow location access in browser settings.');
        } else {
          setError('Unable to detect location. Please try again.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return { location, detectLocation, loading, error };
}
