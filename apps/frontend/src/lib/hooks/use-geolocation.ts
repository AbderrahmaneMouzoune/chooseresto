import { useState } from "react";

interface TLocation {
  latitude: number | null;
  longitude: number | null;
}

interface GeoLocationProps {
  location: TLocation;
  error: string | null;
  getLocation: () => void;
  updateLocation: ({ longitude, latitude }: TLocation) => void;
}

const useGeoLocation = (
  onLocationUpdate?: (location: TLocation) => void,
): GeoLocationProps => {
  const [location, setLocation] = useState<TLocation>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);

  const onLocationChange = (location: TLocation) => {
    setLocation(location);
    if (onLocationUpdate) {
      onLocationUpdate(location);
    }
  };

  const handleSuccess = (position: GeolocationPosition) => {
    onLocationChange({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    setError(null);
  };

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message);
    setLocation({ latitude: null, longitude: null });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const updateLocation = ({ longitude, latitude }: TLocation) => {
    onLocationChange({
      latitude,
      longitude,
    });
  };

  return { location, error, getLocation, updateLocation };
};

export default useGeoLocation;
