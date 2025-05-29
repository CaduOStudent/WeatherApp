import AsyncStorage from '@react-native-async-storage/async-storage';

export type SavedLocation = {
  id: string; // unique id, e.g. city-lat-lon
  name: string;
  latitude: number;
  longitude: number;
  weather: any;
};

const STORAGE_KEY = 'SAVED_LOCATIONS';

// Save or update a location
export async function saveLocation(location: Omit<SavedLocation, 'id'>) {
  const id = `${location.name}-${location.latitude}-${location.longitude}`;
  const newLoc: SavedLocation = { ...location, id };
  const locations = await getSavedLocations();
  const idx = locations.findIndex(loc => loc.id === id);
  if (idx !== -1) {
    locations[idx] = newLoc;
  } else {
    locations.push(newLoc);
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
}

// Get all saved locations
export async function getSavedLocations(): Promise<SavedLocation[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Get a saved location by id
export async function getSavedLocation(id: string): Promise<SavedLocation | undefined> {
  const locations = await getSavedLocations();
  return locations.find(loc => loc.id === id);
}

// Remove a saved location by id
export async function removeSavedLocation(id: string) {
  const locations = await getSavedLocations();
  const filtered = locations.filter(loc => loc.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// Optional: clear all saved locations
export async function clearAllSavedLocations() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}


/* 
#USAGE EXAMPLE#

import { saveLocation, getSavedLocations, removeSavedLocation } from '@/utils/SaveLocationAPI';

// Save a location:
await saveLocation({
  name: "London, UK",
  latitude: 51.5074,
  longitude: -0.1278,
  weather: weatherData,
});

// List all:
const locations = await getSavedLocations();

// Remove:
await removeSavedLocation("London, UK-51.5074--0.1278"); */