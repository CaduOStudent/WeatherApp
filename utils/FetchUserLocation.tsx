import * as Location from 'expo-location';

// Interface describing the structure of a user location object
export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

// Function to get the user's current location (with optional city/country)
export async function fetchUserLocation(): Promise<UserLocation> {
  // Request permission to access location
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }

  // Get current position (latitude and longitude)
  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  // Optionally, reverse geocode to get city/country names
  let city, country;
  try {
    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
    city = place.city;
    country = place.country;
  } catch {
    city = undefined;
    country = undefined;
  }

  // Return location object with coordinates and optional city/country
  return { 
    latitude, 
    longitude, 
    city: city ?? undefined, 
    country: country ?? undefined 
  };
}

// Function to get location data by searching for a city name using Open-Meteo's geocoding API
export async function fetchLocationByName(query: string): Promise<UserLocation | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const loc = data.results[0];
    return {
      latitude: loc.latitude,
      longitude: loc.longitude,
      city: loc.name,
      country: loc.country
    };
  }
  return null;
}

/*
    To use it:
    import { fetchUserLocation, fetchLocationByName } from '@/utils/FetchUserLocation';

    // To get current user location:
    const userLoc = await fetchUserLocation(); // { latitude, longitude, city, country }

    // To get location by search:
    const searchLoc = await fetchLocationByName('London'); // { latitude, longitude, city, country }
*/