// Interface for the options passed to the sun protection recommendation function
interface SunProtectionRecommendationOptions {
  uvIndex: number;
}

// Main function to get a sun protection recommendation based on UV index
export function getSunProtectionRecommendation({ uvIndex }: SunProtectionRecommendationOptions): string {
  if (uvIndex < 3) {
    return "Low UV: No protection needed. Enjoy your day!";
  }
  if (uvIndex < 6) {
    return "Moderate UV: Wear sunglasses and use sunscreen.";
  }
  if (uvIndex < 8) {
    return "High UV: Use SPF 30+ sunscreen, wear a hat and sunglasses, and seek shade.";
  }
  if (uvIndex < 11) {
    return "Very High UV: Use SPF 50+ sunscreen, wear protective clothing, hat, and sunglasses. Avoid the sun.";
  }
  return "Extreme UV: Avoid being outside during midday. Use maximum sun protection: SPF 50+, hat, sunglasses, and long sleeves.";
}