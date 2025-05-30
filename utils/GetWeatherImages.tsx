// Map weather codes to images
const weatherImages: { [key: string]: any } = {
  clear: require('@/assets/images/backgroundImages/clear-night.jpg'),
  cloudy: require('@/assets/images/backgroundImages/cloudy.jpg'),
  rain: require('@/assets/images/backgroundImages/rainy.jpg'),
  thunderstorm: require('@/assets/images/backgroundImages/thunderstorm.jpg'),
  sunny: require('@/assets/images/backgroundImages/sunny.jpg'),
  fog: require('@/assets/images/backgroundImages/foggy.jpg'),
  snow: require('@/assets/images/backgroundImages/snowy.jpg'),
  wind: require('@/assets/images/backgroundImages/windy.jpg'),
  partCloudy: require('@/assets/images/backgroundImages/partly-cloudy.jpg'),
}

// Function to select a background image based on the OpenMeteo weather code
function getWeatherImage(weatherCode: number) {
  // 0: Clear sky
  if (weatherCode === 0) return weatherImages.sunny;
  // 2-10: Partly cloudy
  if (weatherCode >= 2 && weatherCode <= 10) return weatherImages.partCloudy;
  // 1-46: Cloudy (fallback for most cloud codes)
  if (weatherCode >= 1 && weatherCode <= 46) return weatherImages.cloudy;
  // 47-57: Fog
  if (weatherCode >= 47 && weatherCode <= 57) return weatherImages.fog;
  // 58-67: Rain
  if (weatherCode >= 58 && weatherCode <= 67) return weatherImages.rain;
  // 68-77: Snow
  if (weatherCode >= 68 && weatherCode <= 77) return weatherImages.snow;
  // 95-99: Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) return weatherImages.thunderstorm;
  // Default: sunny image
  return weatherImages.sunny;
}

export default getWeatherImage;