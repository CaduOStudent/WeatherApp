# WeatherAppCA

WeatherAppCA is a cross-platform weather application built with [Expo](https://expo.dev) and React Native. It provides accurate, real-time weather information and forecasts for any location worldwide, with a modern, user-friendly interface and a variety of helpful features.

---

## Features

- **Current Weather:**  
  View the current temperature, weather condition, wind, precipitation, UV index, and air quality for your location or any searched city.

- **Hourly & Daily Forecasts:**  
  See detailed hourly and daily weather forecasts, including temperature, precipitation, and weather icons.

- **Location Search & Autocomplete:**  
  Search for any city worldwide with instant autocomplete suggestions and voice input support.

- **Saved Locations:**  
  Save your favorite locations for quick access and weather tracking.

- **Unit Settings:**  
  Switch between metric and imperial units for temperature, wind speed, and precipitation. Choose between 12h and 24h time formats.

- **Clothing & Sun Protection Recommendations:**  
  Get smart suggestions on what to wear and how to protect yourself based on the current weather and UV index.

- **Background Images:**  
  Dynamic background images that change based on the current weather condition.

- **Permissions & Location:**  
  Securely request and use your device’s location to show local weather.

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the App

```bash
npx expo start
```

You can then open the app in:

- [Expo Go](https://expo.dev/go) on your mobile device (scan the QR code)
- Android emulator
- iOS simulator
- A development build

---

## Usage Walkthrough

### Home Screen

- On launch, the app requests location permission. Grant it to see your local weather.
- The main screen displays your current location, temperature, weather condition, and local time (adjusted for your timezone).
- Scroll to see hourly and daily forecasts, wind details, precipitation, UV index, and air quality.

### Searching for a Location

- Tap the search bar at the top.
- Start typing a city name; autocomplete suggestions will appear.
- Select a city from the list or use the microphone icon for voice search.
- The weather for the selected city will be displayed.

### Saving Locations

- After searching for a city, you can save it to your favorites.
- Access saved locations from the menu to quickly view their weather.

### Changing Units

- Go to the settings screen to switch between Celsius/Fahrenheit, km/h/mph, mm/inches, and 12h/24h time formats.
- All weather data will update instantly to reflect your preferences.

### Recommendations

- The app provides clothing and sun protection tips based on the current weather and UV index.

---

## Project Structure

- `components/` – UI components (cards, search bar, etc.)
- `utils/` – Utility functions (API calls, formatting, recommendations, etc.)
- `assets/` – Images and icons
- `app/` – Main app entry and navigation

---

## API & Data Sources

- [Open-Meteo](https://open-meteo.com/) for weather, air quality, and geocoding data.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is for educational purposes.

---

## Credits

- Weather data: [Open-Meteo](https://open-meteo.com/)
- Built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev)
- Built and created by Carlos Eduardo Menezes - 2023252 for the Cross-Platform Development class by David Gonzales

---

Enjoy using WeatherAppCA! 🌦️