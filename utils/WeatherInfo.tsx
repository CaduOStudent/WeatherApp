// components/WeatherInfo.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getWeatherData } from './WeatherApi';

interface WeatherInfoProps {
  latitude: number;
  longitude: number;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await getWeatherData(latitude, longitude);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [latitude, longitude]);

  if (loading)
    return <ActivityIndicator size="large" style={styles.loader} />;
  if (!weather)
    return <Text style={styles.error}>No weather data available</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Temperature: {weather.variables(0)?.value()}°C
      </Text>
      <Text style={styles.text}>
        Wind Speed: {weather.variables(1)?.value()} km/h
      </Text>
      <Text style={styles.text}>
        Weather Code: {weather.variables(2)?.value()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    margin: 16,
    color: 'red',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default WeatherInfo;
