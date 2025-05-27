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


  const backgroundImage = getWeatherImage(52);


  return (
    //<ScrollView contentContainerStyle={styles.scroll} bounces={false}>
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.overlay}>

        <View style={styles.currentLocationTitle}>
          <View style={styles.currentLocationNameInfos}>
            <Text style={styles.currentCity}>
              City Name,{' '}
            </Text>
            <Text style={styles.currentCountry}>
               Country
            </Text>
          </View>
          <Text style={styles.currentLocationTemp}>
            12º
          </Text>
          <Text style={styles.currentLocationCondition}>
            Weather Condition
          </Text>
          <View style={styles.currentLocationTemps}>
            <Text style={styles.currentLocationHighandLow}>
              H: 5º
            </Text>
            <Text style={styles.currentLocationHighandLow}>
              L: 11º
            </Text>
          </View>
        </View>
        <HourlyForecastCard />
        <DailyForecastCard />
        <View style={styles.smallCards}>
          <WindDetailsCard />
          <UVIndexCard />
        </View>

        <AirQualityCard airQualityIndex={5} />
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
    flex: 1,
    width: device_width,
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.2)', // optional overlay
  },
  currentLocationTitle: {
   
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#F5F5F5',
    backgroundColor: 'rgba(143, 164, 193, 0.44)',
    borderRadius: 20,
    gap: 5,
    padding:10,
    margin: 5
  },
  currentLocationTemp:{
    width: 110,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: 60,
    color: '#F5F5F5',
    fontWeight: 600,

  },
  currentLocationCondition:{
    fontSize: 15,
    color: '#1D4972',
    fontWeight: 500
  },
  currentLocationNameInfos:{
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 5

  },
  currentCity: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: 500

  },
  currentCountry: {
    color: '000',
    fontSize: 17,

  },
  smallCards: {

  },
  currentLocationTemps: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    

  },
  currentLocationHighandLow: {
    fontSize: 17,
    color: '#fff'
    

  },


})

