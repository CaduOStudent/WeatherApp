import React, { createContext, useContext, useState } from 'react';

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

  // Function to update settings (merges new settings with previous)
  const setSettings = (newSettings: Partial<UnitSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <UnitSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </UnitSettingsContext.Provider>
  );
}