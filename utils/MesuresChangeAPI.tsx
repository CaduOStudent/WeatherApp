// Type describing the structure of unit settings for the app
export type UnitSettings = {
  isMetric(isMetric: any): [any, any];
  speedMetric: boolean;   // true: km/h, false: mi/h
  tempMetric: boolean;    // true: ºC, false: ºF
  precipMetric: boolean;  // true: mm, false: in
  is24h: boolean;         // true: 24h, false: 12h
};

// Default/current settings (can be updated by user)
let currentSettings: UnitSettings = {
  speedMetric: true,
  tempMetric: true,
  precipMetric: true,
  is24h: true,
  isMetric: function (isMetric: any): [any, any] {
    throw new Error("Function not implemented.");
  }
};

// Update the current unit settings with new values
export function setUnitSettings(settings: Partial<UnitSettings>) {
  currentSettings = { ...currentSettings, ...settings };
}

// Get the current unit settings
export function getUnitSettings(): UnitSettings {
  return currentSettings;
}

// Conversion functions

// Convert temperature based on metric/imperial setting
export function convertTemperature(value: number, tempMetric: boolean): number {
  return tempMetric ? value : (value * 9) / 5 + 32;
}

// Convert speed based on metric/imperial setting
export function convertSpeed(value: number, speedMetric: boolean): number {
  return speedMetric ? value : value / 1.60934;
}

// Convert precipitation based on metric/imperial setting
export function convertPrecipitation(value: number, precipMetric: boolean): number {
  return precipMetric ? value : value / 25.4;
}

// Format hour string based on 24h/12h setting
export function formatHour(date: Date, is24h: boolean): string {
  if (is24h) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  } else {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
}