import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import { getWeatherData } from '@/utils/WeatherApi';
import { fetchUserLocation } from '@/utils/FetchUserLocation';
import { getAirQualityData } from '../../../utils/AirQualityApi';
import HourlyForecastCard from '@/components/HourlyForecastCard'
import DailyForecastCard from '@/components/DailyForecastCard'
import WindDetailsCard from '@/components/WindDetailsCard'
import UVIndexCard from '@/components/UVIndexCard'
import LocationDetails from '@/components/LocationDetails'
import FeelsLikeCard from '@/components/FeelsLikeCard'
import PrecipitationCard from '@/components/PrecipitationCard'
import AirQualityCard from '@/components/AirQualityCard'
import { Dimensions } from 'react-native'
import  getWeatherImage  from '../../../utils/GetWeatherImages'

const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height




export default function HomeScreen() {
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLong, setUserLong] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [airQualityIndex, setAirQualityIndex] = useState<number | null>(null);
  const [weather, setWeather] = useState<any>(null);

  // Clean location effect
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

  const backgroundImage = getWeatherImage(weatherCode);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={[styles.overlay]} bounces={false}>
        {locationError ? (
          <Text>{locationError}</Text>
        ) : userLat !== null && userLong !== null ? (
          <LocationDetails
            latitude={userLat}
            longitude={userLong}
          />
        ) : (
          <Text>Getting location...</Text>
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

