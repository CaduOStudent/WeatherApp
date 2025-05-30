import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getWeatherData } from '@/utils/WeatherApi';
import { getAirQualityData } from '@/utils/AirQualityApi';
import HourlyForecastCard from '@/components/HourlyForecastCard'
import DailyForecastCard from '@/components/DailyForecastCard'
import WindDetailsCard from '@/components/WindDetailsCard'
import UVIndexCard from '@/components/UVIndexCard'
import LocationDetails from '@/components/LocationDetails'
import FeelsLikeCard from '@/components/FeelsLikeCard'
import PrecipitationCard from '@/components/PrecipitationCard'
import AirQualityCard from '@/components/AirQualityCard'
import { Dimensions } from 'react-native'
import getWeatherImage from '@/utils/GetWeatherImages'

const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

export default function DetailsScreen() {
  // Get params from router
  const { latitude, longitude, city, country } = useLocalSearchParams();

  // Parse lat/lon as numbers
  const lat = latitude ? parseFloat(latitude as string) : null;
  const lon = longitude ? parseFloat(longitude as string) : null;

  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [airQualityIndex, setAirQualityIndex] = useState<number | null>(null);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    async function fetchAirQuality() {
      if (lat !== null && lon !== null) {
        try {
          const data = await getAirQualityData(lat, lon);
          setAirQualityIndex(data.current.europeanAqi ?? null);
        } catch (err) {
          setAirQualityIndex(null);
        }
      }
    }
    fetchAirQuality();
  }, [lat, lon]);

  useEffect(() => {
    async function fetchWeather() {
      if (lat !== null && lon !== null) {
        try {
          const data = await getWeatherData(lat, lon);
          setWeather(data);
          setWeatherCode(data.current.weatherCode ?? 0);
        } catch (err) {
          setWeather(null);
          setWeatherCode(0);
        }
      }
    }
    fetchWeather();
  }, [lat, lon]);

  const backgroundImage = getWeatherImage(weatherCode);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={[styles.overlay]} bounces={false}>
        {lat === null || lon === null ? (
          <Text>Invalid location.</Text>
        ) : (
          <LocationDetails
            latitude={lat}
            longitude={lon}
          />
        )}

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

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: device_width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: 'rgba(255,255,255,0.2)',
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
});