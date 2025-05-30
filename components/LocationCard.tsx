import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
// ImageBackground is used for card backgrounds
import { ImageBackground } from 'expo-image'
// Utility to get weather background image based on weather code
import getWeatherImage from '@/utils/GetWeatherImages'
// Utility to fetch weather data from API
import { getWeatherData } from '@/utils/WeatherApi';
// Utility to format temperature and other values
import formatValue from '@/utils/FormatValues'
// Weather code descriptions for display
import { weatherCodeDescriptions } from '../utils/WeatherCodes';

// Get device dimensions for responsive design
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

// Props for the LocationCard component
interface LocationCardProps {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

// Main component to display a weather/location card
export default function LocationCard({ city, country, latitude, longitude }: LocationCardProps) {
  // State to store fetched weather data
  const [weather, setWeather] = useState<any>(null);

  // Fetch weather data when latitude or longitude changes
  useEffect(() => {
    async function fetchWeather() {
      const data = await getWeatherData(latitude, longitude);
      setWeather(data);
    }
    fetchWeather();
  }, [latitude, longitude]);

  // Get weather code for background image
  const weatherCode = weather?.current?.weatherCode ?? 0;
  const backgroundImage = getWeatherImage(weatherCode);

  // --- Local time calculation using timezone from weather API ---
  // Initialize local time and GMT offset strings
  let localTimeStr = '--';
  let gmtStr = '';
  // Only attempt if weather and timezone are available
  if (weather?.current?.time && weather?.timezone) {
    try {
      // 1. Parse the UTC time string from the API into a Date object
      // If weather.current.time is a UNIX timestamp in seconds, convert to ms
      const utcDate = typeof weather.current.time === 'number'
        ? new Date(weather.current.time * 1000)
        : new Date(weather.current.time);

      // 2. Format the local time in the location's timezone using Intl.DateTimeFormat
      //    - This will display the time as it would appear in the target timezone
      localTimeStr = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: weather.timezone, // Use the timezone string from the API
      }).format(utcDate);

      // 3. Calculate the GMT offset for the location's timezone
      //    a. Get the time in the target timezone as a string
      const tzDateString = utcDate.toLocaleString('en-US', { timeZone: weather.timezone });
      //    b. Create a Date object from that string (now in local time)
      const tzDate = new Date(tzDateString);
      //    c. Get the offset in minutes between UTC and the target timezone
      const offsetMinutes = (tzDate.getTime() - utcDate.getTime()) / (60 * 1000);
      //    d. Convert to hours for GMT offset
      const offsetHours = offsetMinutes / 60;
      //    e. Format as GMT+X or GMT-X
      gmtStr = `GMT${offsetHours >= 0 ? '+' : ''}${offsetHours}`;
    } catch {
      // Fallback if any error occurs
      localTimeStr = '--';
      gmtStr = '';
    }
  }
  // --- End local time calculation ---


  return (
    <View style={styles.cardBase}>
      {/* Card background image based on weather */}
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        imageStyle={{ borderRadius: 40 }}
        contentFit='cover'
      >
        {/* Left side: location and weather description */}
        <View style={styles.leftSide}>
          <View style={styles.locationDesc}>
            <Text style={styles.City}>
              {city},{' '}
            </Text>
            <Text style={styles.Country}>
              {country}
            </Text>
          </View>
          {/* Display local time and GMT offset */}
          <Text style={styles.localTime}>
            {localTimeStr} {gmtStr}
          </Text>
          {/* Display weather condition description */}
          <Text style={styles.locationCond}>
            {weather?.current?.weatherCode !== undefined
              ? weatherCodeDescriptions[weather.current.weatherCode] || `Code: ${weather.current.weatherCode}`
              : 'Weather Condition'}
          </Text>
        </View>
        {/* Right side: temperature and high/low */}
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

// Styles for the card and its elements
const styles = StyleSheet.create({
  cardBase: {
    minWidth: '90%',
    borderRadius: 40,
    overflow: 'hidden', // Clips the background image to the border radius
    backgroundColor: '#fff', // Fallback color
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
  },
  City: {
    color: 'rgb(249, 246, 246)',
    fontSize: 20,
    fontFamily: 'Helvetica',
    verticalAlign: 'bottom'
  },
  Country: {
    color: 'rgba(247, 247, 247, 0.83)',
    fontSize: 14,
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