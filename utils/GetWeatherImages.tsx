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

function getWeatherImage(weatherCode: number) {
  // Example mapping, adjust according to OpenMeteo codes
  if (weatherCode === 0) return weatherImages.sunny;
  if (weatherCode >= 2 && weatherCode <= 10) return weatherImages.partCloudy;
  if (weatherCode >= 1 && weatherCode <= 46) return weatherImages.cloudy;
  if (weatherCode >= 47 && weatherCode <= 57) return weatherImages.fog;
  if (weatherCode >= 58 && weatherCode <= 67) return weatherImages.rain;
  if (weatherCode >= 68 && weatherCode <= 77) return weatherImages.snow;
  if (weatherCode >= 95 && weatherCode <= 99) return weatherImages.thunderstorm;
  // ...add more logic as needed
  return weatherImages.sunny;
}

export default getWeatherImage;