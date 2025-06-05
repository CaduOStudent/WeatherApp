import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Type describing the structure of unit settings for the app
export type UnitSettings = {
  speedMetric: boolean;   // true: km/h, false: mi/h
  tempMetric: boolean;    // true: ºC, false: ºF
  precipMetric: boolean;  // true: mm, false: in
  is24h: boolean;         // true: 24h, false: 12h
};

// Default settings for the context
const defaultSettings: UnitSettings = {
  speedMetric: true,
  tempMetric: true,
  precipMetric: true,
  is24h: true,
};

// Create the context with default values
const UnitSettingsContext = createContext<{
  settings: UnitSettings;
  setSettings: (s: Partial<UnitSettings>) => void;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

// Custom hook to use the unit settings context
export const useUnitSettings = () => useContext(UnitSettingsContext);

// Provider component to wrap your app and provide unit settings state
export function UnitSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<UnitSettings>(defaultSettings);

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('unitSettings');
        if (stored) {
          setSettingsState(JSON.parse(stored));
        }
      } catch (e) {
        // Ignore errors, use default
      }
    })();
  }, []);

  // Save settings to AsyncStorage whenever they change
  const setSettings = (newSettings: Partial<UnitSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings };
      AsyncStorage.setItem('unitSettings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UnitSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </UnitSettingsContext.Provider>
  );
}