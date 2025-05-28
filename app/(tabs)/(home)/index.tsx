import { View, Text, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import AirQualityCard from '@/components/AirQualityCard'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchAutocomplete from '@/utils/SearchAutocompletion'
import SearchBar from '@/utils/SearchBar'
import React, { useState, useEffect } from 'react';
import { getWeatherData } from '@/utils/WeatherApi';

import * as Location from 'expo-location';
import HourlyForecastCard from '@/components/HourlyForecastCard'
import DailyForecastCard from '@/components/DailyForecastCard'
import WindDetailsCard from '@/components/WindDetailsCard'
import UVIndexCard from '@/components/UVIndexCard'
import LocationDetails from '@/components/LocationDetails'
import { getAirQualityData } from '../../../utils/AirQualityApi';




const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

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

}

function getWeatherImage(weatherCode: number) {
  // Example mapping, adjust according to OpenMeteo codes
  if (weatherCode === 0) return weatherImages.clear;
  if (weatherCode >= 1 && weatherCode <= 3) return weatherImages.cloudy;
  if (weatherCode >= 51 && weatherCode <= 63) return weatherImages.rain;
  if (weatherCode >= 64 && weatherCode <= 67) return weatherImages.thunderstorm;
  // ...add more logic as needed
  return weatherImages.clear;
}


export default function HomeScreen() {
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLong, setUserLong] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [airQualityIndex, setAirQualityIndex] = useState<number | null>(null);


  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setUserLat(location.coords.latitude);
        setUserLong(location.coords.longitude);
      } catch (err) {
        setLocationError('Failed to get user location');
      }
    })();
  }, []);

  // Fetch air quality index using your API handler
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

  const backgroundImage = getWeatherImage(weatherCode);


  return (
    //<ScrollView contentContainerStyle={styles.scroll} bounces={false}>
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={[styles.overlay]} bounces={false}>

        {locationError ? (
          <Text>{locationError}</Text>
        ) : userLat !== null && userLong !== null ? (
          <LocationDetails latitude={userLat} longitude={userLong} />
        ) : (
          <Text>Getting location...</Text>
        )}

        <HourlyForecastCard latitude={userLat} longitude={userLong} />

        <DailyForecastCard  latitude={userLat} longitude={userLong}/>

        <View style={styles.smallCards}>
          <WindDetailsCard />
          <UVIndexCard />
        </View>

        <AirQualityCard airQualityIndex={airQualityIndex ?? 0} />
      </ScrollView>


    </ImageBackground>
    // </ScrollView>
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

  },


})

