// Interface for the options passed to the recommendation function
interface ClothesRecommendationOptions {
  temperature: number;
  weatherCode: number;
  isRaining?: boolean;
  isCloudy?: boolean;
}

// Main function to get a clothing recommendation based on weather conditions
export function getClothesRecommendation({ temperature, weatherCode, isRaining, isCloudy }: ClothesRecommendationOptions): string {
  // Weather code ranges for rain and clouds (Open-Meteo standard)
  const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];
  const thunderstormCodes = [95, 96, 99];
  const snowCodes = [71, 73, 75, 77, 85, 86];
  const cloudyCodes = [2, 3, 45, 48];

  // Rain detection: true if raining flag is set, or weather code matches rain/thunderstorm
  const raining = isRaining || rainCodes.includes(weatherCode) || thunderstormCodes.includes(weatherCode);

  // Cloudy detection: true if cloudy flag is set, or weather code matches cloudy
  const cloudy = isCloudy || cloudyCodes.includes(weatherCode);

  // Recommendations based on weather and temperature
  if (raining && temperature > 20) {
    return "It's warm and raining. Wear lighter clothes and take a jacket and an umbrella.";
  }
  if (temperature > 30) {
    return "It's very hot! Wear summer clothes, but take a jacket for the night.";
  }
  if (raining) {
    return "It's raining. Take an umbrella and wear a jacket.";
  }
  if (cloudy && raining) {
    return "It might rain. Take an umbrella and a jacket just in case.";
  }
  if (cloudy) {
    return "It's cloudy. A light jacket is recommended.";
  }
  if (snowCodes.includes(weatherCode)) {
    return "It's snowy. Wear warm clothes, a jacket, and boots.";
  }
  if (temperature < 10) {
    return "It's cold. Wear warm clothes and a jacket.";
  }
  // Default recommendation for nice weather
  return "The weather is nice. Dress comfortably!";
}