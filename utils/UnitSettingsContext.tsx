import React, { createContext, useContext, useState } from 'react';

export type UnitSettings = {
  speedMetric: boolean;
  tempMetric: boolean;
  precipMetric: boolean;
  is24h: boolean;
};

const defaultSettings: UnitSettings = {
  speedMetric: true,
  tempMetric: true,
  precipMetric: true,
  is24h: true,
};

const UnitSettingsContext = createContext<{
  settings: UnitSettings;
  setSettings: (s: Partial<UnitSettings>) => void;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

export const useUnitSettings = () => useContext(UnitSettingsContext);

export function UnitSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<UnitSettings>(defaultSettings);

  const setSettings = (newSettings: Partial<UnitSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <UnitSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </UnitSettingsContext.Provider>
  );
}