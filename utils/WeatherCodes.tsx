// WeatherCodes.ts
export interface WeatherCondition {
  code: number;
  description: string;
  IoniconName: string;
}

export const WeatherConditions: WeatherCondition[] = [
  { code: 0, description: 'Clear sky', IoniconName: '' },
  { code: 1, description: 'Mainly clear', IoniconName: '' },
  { code: 2, description: 'Partly cloudy', IoniconName: '' },
  { code: 3, description: 'Overcast', IoniconName: '' },
  { code: 45, description: 'Fog', IoniconName: '' },
  { code: 48, description: 'Depositing rime fog', IoniconName: '' },
  { code: 51, description: 'Light drizzle', IoniconName: '' },
  { code: 53, description: 'Moderate drizzle', IoniconName: '' },
  { code: 55, description: 'Dense intensity drizzle', IoniconName: '' },
  { code: 56, description: 'Light freezing drizzle', IoniconName: '' },
  { code: 57, description: 'Dense freezing drizzle', IoniconName: '' },
  { code: 61, description: 'Slight rain', IoniconName: '' },
  { code: 63, description: 'Moderate rain', IoniconName: '' },
  { code: 65, description: 'Heavy rain', IoniconName: '' },
  { code: 66, description: 'Light freezing rain', IoniconName: '' },
  { code: 67, description: 'Heavy freezing rain', IoniconName: '' },
  { code: 71, description: 'Slight snowfall', IoniconName: '' },
  { code: 73, description: 'Moderate snowfall', IoniconName: '' },
  { code: 75, description: 'Heavy snowfall', IoniconName: '' },
  { code: 77, description: 'Snow grains', IoniconName: '' },
  { code: 80, description: 'Slight rain showers', IoniconName: '' },
  { code: 81, description: 'Moderate rain showers', IoniconName: '' },
  { code: 82, description: 'Violent rain showers', IoniconName: '' },
  { code: 85, description: 'Slight snow showers', IoniconName: '' },
  { code: 86, description: 'Heavy snow showers', IoniconName: '' },
  { code: 95, description: 'Thunderstorm (slight or moderate)', IoniconName: '' },
  { code: 96, description: 'Thunderstorm with slight hail', IoniconName: '' },
  { code: 99, description: 'Thunderstorm with heavy hail', IoniconName: '' },
];

export const weatherCodeDescriptions: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense intensity drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm (slight or moderate)",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
};

export const weatherCodeIonicons: { [key: number]: string } = {
    0: "sunny", // Clear sky
    1: "partly-sunny", // Mainly clear
    2: "cloudy-outline", // Partly cloudy
    3: "cloud", // Overcast
    45: "cloudy", // Fog
    48: "cloudy", // Depositing rime fog
    51: "rainy-outline", // Light drizzle
    53: "rainy", // Moderate drizzle
    55: "rainy-sharp", // Dense intensity drizzle
    56: "rainy-outline", // Light freezing drizzle
    57: "rainy-sharp", // Dense freezing drizzle
    61: "rainy-outline", // Slight rain
    63: "rainy", // Moderate rain
    65: "rainy-sharp", // Heavy rain
    66: "snow-outline", // Light freezing rain
    67: "snow", // Heavy freezing rain
    71: "snow-outline", // Slight snowfall
    73: "snow", // Moderate snowfall
    75: "snow-sharp", // Heavy snowfall
    77: "snow", // Snow grains
    80: "rainy-outline", // Slight rain showers
    81: "rainy", // Moderate rain showers
    82: "rainy-sharp", // Violent rain showers
    85: "snow-outline", // Slight snow showers
    86: "snow", // Heavy snow showers
    95: "thunderstorm-outline", // Thunderstorm (slight or moderate)
    96: "thunderstorm", // Thunderstorm with slight hail
    99: "thunderstorm-sharp", // Thunderstorm with heavy hail
};

