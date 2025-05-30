## API Integration Details

# Weather Data:
getWeatherData fetches current, hourly, and daily weather from Open-Meteo.

# Air Quality:
getAirQualityData fetches AQI and UV index from Open-Meteo’s air quality API.

# Geolocation:
fetchUserLocation uses Expo Location to get device coordinates and reverse geocodes to city/country.

# Location Search:
SearchAutocomplete and SearchBar use Open-Meteo’s geocoding API for city search and autocomplete.

# Saved Locations:
saveLocation, getSavedLocations, etc. use AsyncStorage to persist favorite locations.