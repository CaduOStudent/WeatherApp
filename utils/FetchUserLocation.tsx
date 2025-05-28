import * as Location from 'expo-location';

export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export async function fetchUserLocation(): Promise<UserLocation> {
  // Request permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }

  // Get current position
  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  // Optionally, reverse geocode to get city/country
  let city, country;
  try {
    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
    city = place.city;
    country = place.country;
  } catch {
    city = undefined;
    country = undefined;
  }

  return { 
    latitude, 
    longitude, 
    city: city ?? undefined, 
    country: country ?? undefined 
  };
}

// For searching by city name, you can use a geocoding API (e.g., Open-Meteo, Mapbox, or Google Maps)
// Example using Open-Meteo's geocoding API:
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

{/*
    To use it:
    import { fetchUserLocation, fetchLocationByName } from '@/utils/FetchUserLocation';

// To get current user location:
const userLoc = await fetchUserLocation(); // { latitude, longitude, city, country }

// To get location by search:
const searchLoc = await fetchLocationByName('London'); // { latitude, longitude, city, country }

     */}