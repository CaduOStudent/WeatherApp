export type UnitSettings = {
  isMetric(isMetric: any): [any, any];
  speedMetric: boolean;   // true: km/h, false: mi/h
  tempMetric: boolean;    // true: ºC, false: ºF
  precipMetric: boolean;  // true: mm, false: in
  is24h: boolean;         // true: 24h, false: 12h
};

let currentSettings: UnitSettings = {
    speedMetric: true,
    tempMetric: true,
    precipMetric: true,
    is24h: true,
    isMetric: function (isMetric: any): [any, any] {
        throw new Error("Function not implemented.");
    }
};

export function setUnitSettings(settings: Partial<UnitSettings>) {
  currentSettings = { ...currentSettings, ...settings };
}

export function getUnitSettings(): UnitSettings {
  return currentSettings;
}

// Conversion functions
export function convertTemperature(value: number, tempMetric: boolean): number {
  return tempMetric ? value : (value * 9) / 5 + 32;
}

export function convertSpeed(value: number, speedMetric: boolean): number {
  return speedMetric ? value : value / 1.60934;
}

export function convertPrecipitation(value: number, precipMetric: boolean): number {
  return precipMetric ? value : value / 25.4;
}

// Format hour
export function formatHour(date: Date, is24h: boolean): string {
  if (is24h) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  } else {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
}