export type UnitSettings = {
    isMetric: boolean; // true: metric, false: imperial
    is24h: boolean;    // true: 24h, false: 12h
};

let currentSettings: UnitSettings = {
    isMetric: true,
    is24h: true,
};

export function setUnitSettings(settings: UnitSettings) {
    currentSettings = settings;
}

export function getUnitSettings(): UnitSettings {
    return currentSettings;
}

// Conversion functions
export function convertTemperature(value: number, isMetric: boolean): number {
    return isMetric ? value : (value * 9) / 5 + 32;
}

export function convertSpeed(value: number, isMetric: boolean): number {
    return isMetric ? value : value / 1.60934;
}

export function convertPrecipitation(value: number, isMetric: boolean): number {
    return isMetric ? value : value / 25.4;
}

// Format hour
export function formatHour(date: Date, is24h: boolean): string {
    if (is24h) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } else {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
}