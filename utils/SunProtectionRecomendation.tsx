interface SunProtectionRecommendationOptions {
  uvIndex: number;
}

export function getSunProtectionRecommendation({ uvIndex }: SunProtectionRecommendationOptions): string {
  if (uvIndex < 3) {
    return "Low UV: No protection needed. Enjoy your day!";
  }
  if (uvIndex < 6) {
    return "Moderate UV: Wear sunglasses and use sunscreen.";
  }
  if (uvIndex < 8) {
    return "High UV: Use SPF 30+ sunscreen, wear a hat and sunglasses, and seek shade during midday.";
  }
  if (uvIndex < 11) {
    return "Very High UV: Use SPF 50+ sunscreen, wear protective clothing, a wide-brimmed hat, and sunglasses. Avoid the sun at midday.";
  }
  return "Extreme UV: Avoid being outside during midday. Use maximum sun protection: SPF 50+, hat, sunglasses, and long sleeves.";
}