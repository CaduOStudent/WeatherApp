import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'expo-image'
import getWeatherImage from '@/utils/GetWeatherImages'
import { getWeatherData } from '@/utils/WeatherApi';
import formatValue from '@/utils/FormatValues'
import { weatherCodeDescriptions } from '../utils/WeatherCodes';

const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

interface LocationCardProps {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export default function LocationCard({ city, country, latitude, longitude }: LocationCardProps) {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    async function fetchWeather() {
      const data = await getWeatherData(latitude, longitude);
      setWeather(data);
    }
    fetchWeather();
  }, [latitude, longitude]);

  const weatherCode = weather?.current?.weatherCode ?? 0;
  const backgroundImage = getWeatherImage(weatherCode);

  // Get local time and GMT offset
  let localTimeStr = '--';
  let gmtStr = '';
  if (weather?.current?.time && weather?.timezone) {
    const localDate = new Date(weather.current.time);
    localTimeStr = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // Try to extract GMT offset from timezone string, e.g., "GMT+2"
    gmtStr = weather.timezone.replace('Etc/', '').replace('_', ' ');
  } else if (weather?.current?.time && weather?.utc_offset_seconds !== undefined) {
    const localDate = new Date(weather.current.time);
    localTimeStr = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const offset = weather.utc_offset_seconds / 3600;
    gmtStr = `GMT${offset >= 0 ? '+' : ''}${offset}`;
  }

  return (
    <View style={styles.cardBase}>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        imageStyle={{ borderRadius: 40 }}
        contentFit='cover'
      >
        <View style={styles.leftSide}>
          <View style={styles.locationDesc}>
            <Text style={styles.City}>
              {city},{' '}
            </Text>
            <Text style={styles.Country}>
              {country}
            </Text>
          </View>
          <Text style={styles.localTime}>
            {localTimeStr} {gmtStr}
          </Text>
          <Text style={styles.locationCond}>
            {weather?.current?.weatherCode !== undefined
              ? weatherCodeDescriptions[weather.current.weatherCode] || `Code: ${weather.current.weatherCode}`
              : 'Weather Condition'}
          </Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.LocationTemp}>
            {formatValue(weather?.current?.temperature2m) ?? '--'}º
          </Text>
          <View style={styles.locationHandLTemps}>
            <Text style={styles.LocationHighandLow}>
              L: {formatValue(weather?.daily?.temperature2mMin?.[0]) ?? '--'}º
            </Text>
            <Text style={styles.LocationHighandLow}>
              H: {formatValue(weather?.daily?.temperature2mMax?.[0]) ?? '--'}º
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  cardBase: {
    width: '90%',
    borderRadius: 40,
    overflow: 'hidden', // <-- This clips the background image to the border radius
    backgroundColor: '#fff', // Optional: fallback color

  },
  background: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    padding: 15,
    minHeight: 145
  },
  leftSide: {
    minWidth: 170,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(143, 164, 193, 0.37)'

  },
  locationDesc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 28
  },
  City: {
    color: 'rgb(249, 246, 246)',
    fontSize: 21,
    fontFamily: 'Helvetica',
    verticalAlign: 'bottom'

  },
  Country: {
    color: 'rgba(247, 247, 247, 0.83)',
    fontSize: 18,
    fontFamily: 'Helvetica',
    verticalAlign: 'bottom'
  },
  localTime: {
    color: 'rgb(245, 244, 244)',
    fontSize: 18,
    fontFamily: 'Helvetica',
    verticalAlign: 'bottom',

  },
  locationCond: {
    color: 'rgb(245, 244, 244)',
    fontSize: 12,
    fontFamily: 'Helvetica',
    verticalAlign: 'bottom',
  },
  rightSide: {
    minWidth: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(143, 164, 193, 0.37)'

  },
  LocationTemp: {
    color: 'rgb(249, 246, 246)',
    fontSize: 40,
    fontFamily: 'Helvetica',


  },
  locationHandLTemps: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 10

  },
  LocationHighandLow: {
    color: 'rgb(249, 246, 246)',
    fontSize: 12,
    fontFamily: 'Helvetica',
  }


})