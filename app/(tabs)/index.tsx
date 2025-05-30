import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
// Import weather and location utilities
import { getWeatherData } from '@/utils/WeatherApi';
import { fetchUserLocation } from '@/utils/FetchUserLocation';
import { getAirQualityData } from '../../utils/AirQualityApi';
// Import weather and info cards
import HourlyForecastCard from '@/components/HourlyForecastCard'
import DailyForecastCard from '@/components/DailyForecastCard'
import WindDetailsCard from '@/components/WindDetailsCard'
import UVIndexCard from '@/components/UVIndexCard'
import LocationDetails from '@/components/LocationDetails'
import FeelsLikeCard from '@/components/FeelsLikeCard'
import PrecipitationCard from '@/components/PrecipitationCard'
import AirQualityCard from '@/components/AirQualityCard'
import { Dimensions } from 'react-native'
import  getWeatherImage  from '../../utils/GetWeatherImages'

// Get device dimensions for responsive layout
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

export default function HomeScreen() {
  // State for weather, location, and air quality
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLong, setUserLong] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [airQualityIndex, setAirQualityIndex] = useState<number | null>(null);
  const [weather, setWeather] = useState<any>(null);

  // Get user location on mount
  useEffect(() => {
    (async () => {
      try {
        const userLoc = await fetchUserLocation();
        setUserLat(userLoc.latitude);
        setUserLong(userLoc.longitude);
        setLocationError(null);
      } catch (err: any) {
        setLocationError(err.message || 'Failed to get user location');
      }
    })();
  }, []);

  // Fetch air quality data when location changes
  useEffect(() => {
    async function fetchAirQuality() {
      if (userLat !== null && userLong !== null) {
        try {
          const data = await getAirQualityData(userLat, userLong);
          setAirQualityIndex(data.current.europeanAqi ?? null);
        } catch (err) {
          setAirQualityIndex(null);
        }
      }
    }
    fetchAirQuality();
  }, [userLat, userLong]);

  // Fetch weather data when location changes
  useEffect(() => {
    async function fetchWeather() {
      if (userLat !== null && userLong !== null) {
        try {
          const data = await getWeatherData(userLat, userLong);
          setWeather(data);
          setWeatherCode(data.current.weatherCode ?? 0);
        } catch (err) {
          setWeather(null);
          setWeatherCode(0);
        }
      }
    }
    fetchWeather();
  }, [userLat, userLong]);

  // Get background image based on weather code
  const backgroundImage = getWeatherImage(weatherCode);

  // Compute local time string if weather data is available
  let localTimeStr: string | undefined = undefined;
  if (weather?.current?.time && weather?.timezone) {
    // Convert UTC time to local time using the location's timezone
    const utcDate = new Date(weather.current.time);
    localTimeStr = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: weather.timezone,
    }).format(utcDate);
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={[styles.overlay]} bounces={false}>
        {/* Show error if location can't be fetched */}
        {locationError ? (
          <Text>{locationError}</Text>
        ) : userLat !== null && userLong !== null ? (
          // Show location details if location is available
          <LocationDetails
            latitude={userLat}
            longitude={userLong}
            localTime={localTimeStr ?? ''}
          />
        ) : (
          // Show loading text while fetching location
          <Text>Getting location...</Text>
        )}

        {/* Weather and info cards */}
        <HourlyForecastCard weather={weather} />
        <DailyForecastCard weather={weather} />

        <View style={styles.smallCards}>
          <FeelsLikeCard
            apparentTemperature={weather?.current?.apparentTemperature}
            weatherCode={weather?.current?.weatherCode}
          />
          <WindDetailsCard weather={weather} />
        </View>

        <AirQualityCard airQualityIndex={airQualityIndex ?? 0} />

        <View style={styles.smallCards}>
          <UVIndexCard weather={weather} />
          <PrecipitationCard weather={weather} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// Styles for the home screen layout and cards
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: device_width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // or any color for testing
    fontFamily: 'Helvetica',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: device_width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'auto',
    padding: 10,
    fontFamily: 'Helvetica',
  },
  background: {
    flex: 1,
    width: device_width,
    height: device_height,
  },
  overlay: {
    width: device_width,
    alignItems: 'center',
    display: 'flex',
    gap: 20,
    backgroundColor: 'rgba(255,255,255,0.2)', // optional overlay
    paddingTop: 30,
    paddingBottom: 40
  },
  smallCards: {
    width: 330,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})