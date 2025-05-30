import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
// Utility to fetch weather data (not used directly here, but imported for consistency)
import { getWeatherData } from '../utils/WeatherApi';
// Mapping from weather codes to Ionicon names
import { weatherCodeIonicons } from '../utils/WeatherCodes';
// Utility to format temperature and other values
import formatValue from '@/utils/FormatValues';

interface HourlyForecastCardProps {
  weather: any;
}

// Main component to display a 24-hour weather forecast
export default function HourlyForecastCard({ weather }: HourlyForecastCardProps) {
  // Helper function to create hourly forecast cards for each hour
  function createHourlyCards() {
    // If hourly data is missing, return nothing
    if (
      !weather?.hourly?.time ||
      !weather?.hourly?.temperature2m ||
      !weather?.hourly?.weatherCode
    ) return null;

    // Ensure all times are Date objects
    const times = weather.hourly.time.map((t: string | Date) => t instanceof Date ? t : new Date(t));

    // Get the current hour, rounded down to the hour
    const now = new Date();
    now.setMinutes(0, 0, 0);

    // Find the first index where the hour is >= current hour
    const firstIndex = times.findIndex((t: Date) => t >= now);
    const start = firstIndex === -1 ? 0 : firstIndex;

    // Create up to 24 forecast cards starting from the current hour
    return Array.from({ length: 24 }).map((_, i) => {
      const idx = start + i;
      // Guard against missing data for any hour
      if (
        idx >= times.length ||
        idx >= weather.hourly.temperature2m.length ||
        idx >= weather.hourly.weatherCode.length
      ) return null;

      const hourTime = times[idx];
      const temp = weather.hourly.temperature2m[idx];
      const code = weather.hourly.weatherCode[idx];
      // Get the Ionicon name for the weather code, fallback to "help"
      const iconName = (weatherCodeIonicons[code] || "help") as React.ComponentProps<typeof Ionicons>["name"];
      // Label for the hour: "Now" for the first, otherwise HH:00
      const hourLabel = i === 0 ? "Now" : hourTime.getHours().toString().padStart(2, '0') + ":00";
      return (
        <View key={idx} style={styles.eachCard}>
          <Text style={styles.hourStamp}>{hourLabel}</Text>
          {/* Weather icon for the hour */}
          <Ionicons name={iconName} size={30} color='black' />
          {/* Temperature for the hour */}
          <Text style={styles.hoursTemp}>{formatValue(temp)}º</Text>
        </View>
      );
    });
  }

  return (
    <View style={styles.CardBaseStyle}>
      {/* Card title and clock icon */}
      <View style={styles.cardTitleDiv}>
        <Text style={styles.cardTitle}>Hourly forecast</Text>
        <Ionicons name="time-outline" size={20} color="black" />
      </View>
      {/* Divider line */}
      <View style={styles.div} />
      {/* Horizontal scrollable list of hourly forecast cards */}
      <ScrollView horizontal bounces={false} style={styles.hourlyCards}>
        {createHourlyCards()}
      </ScrollView>
    </View>
  );
}

// Styles for the HourlyForecastCard and its elements
const styles = StyleSheet.create({
  CardBaseStyle: {
    width: 330,
    minHeight: 110,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 14,
    backgroundColor: 'rgba(143, 164, 193, 0.85)',
    padding: 5
  },
  cardTitleDiv: {
    width: 300,
    minHeight: 22,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardTitle: {
    color: '#191919',
    fontFamily: 'Helvetica',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18
  },
  div: {
    width: 310,
    height: 2,
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: '#7A9AC9'
  },
  hourlyCards: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 65,
    width: 300
  },
  eachCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginRight: 10
  },
  hourStamp: {
    fontSize: 13,
    fontFamily: 'helvetica',
    textAlign: 'center',
  },
  hoursTemp: {
    fontSize: 14,
    fontFamily: 'helvetica',
    textAlign: 'center',
  },
});