import AsyncStorage from '@react-native-async-storage/async-storage';

export type SavedLocation = {
  id: string;
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
};

const STORAGE_KEY = 'SAVED_LOCATIONS';

export async function saveLocation(location: SavedLocation) {
  const locations = await getSavedLocations();
  const exists = locations.find(l => l.id === location.id);
  let newLocations;
  if (exists) {
    newLocations = locations.map(l => (l.id === location.id ? location : l));
  } else {
    newLocations = [...locations, location];
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLocations));
}

export async function removeLocation(id: string) {
  const locations = await getSavedLocations();
  const newLocations = locations.filter(l => l.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLocations));
}

export async function getSavedLocations(): Promise<SavedLocation[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function isLocationSaved(id: string): Promise<boolean> {
  const locations = await getSavedLocations();
  return locations.some(l => l.id === id);
}