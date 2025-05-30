import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
// Utility to fetch weather data (not used directly here, but imported for consistency)
import { getWeatherData } from '../utils/WeatherApi';
// Mapping from weather codes to Ionicon names
import { weatherCodeIonicons } from '../utils/WeatherCodes';
// Utility to format temperature and other values
import formatValue from '@/utils/FormatValues';

interface DailyForecastCardProps {
  weather: any;
}

// Main component to display a 10-day weather forecast
export default function DailyForecastCard({ weather }: DailyForecastCardProps) {
  const daily = weather?.daily;

  // Helper function to create daily forecast cards for each day
  function createDailyCards() {
    // If daily data is missing, return nothing
    if (!daily || !daily.time || !daily.temperature2mMax || !daily.temperature2mMin || !daily.weatherCode) return null;

    // Convert each time entry to a Date object
    const times = daily.time.map((t: string | Date) => t instanceof Date ? t : new Date(t));
    // Array of weekday names for display
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Create up to 10 forecast cards
    return Array.from({ length: 10 }).map((_, i) => {
      // Guard against missing data for any day
      if (
        i >= times.length ||
        i >= daily.temperature2mMax.length ||
        i >= daily.temperature2mMin.length ||
        i >= daily.weatherCode.length
      ) return null;

      const dayTime = times[i];
      const maxDailyTemp = daily.temperature2mMax[i];
      const minDailyTemp = daily.temperature2mMin[i];
      const code = daily.weatherCode[i];
      // Get the Ionicon name for the weather code, fallback to "help"
      const iconName = (weatherCodeIonicons[code] || "help") as React.ComponentProps<typeof Ionicons>["name"];
      // Label for the day: "Today" for the first, weekday name for others
      const dayLabel = i === 0 ? "Today" : weekDays[dayTime.getDay()];

      return (
        <View key={i} style={styles.eachCard}>
          <Text style={styles.dayStamp}>{dayLabel}</Text>
          {/* Weather icon for the day */}
          <Ionicons name={iconName} size={30} color='black' />
          <View style={styles.dayTemps}>
            {/* Minimum and maximum temperatures */}
            <Text style={styles.dayTemp}>{formatValue(minDailyTemp)}º</Text>
            <Text style={styles.dayTemp}>{formatValue(maxDailyTemp)}º</Text>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={styles.DailyCardBase}>
      {/* Card title and calendar icon */}
      <View style={styles.cardTitleDiv}>
        <Text style={styles.cardTitle}>10-Day Forecast</Text>
        <Ionicons name="calendar-outline" size={20} color="black" />
      </View>
      {/* Divider line */}
      <View style={styles.div} />
      {/* List of daily forecast cards */}
      <View style={styles.dailyCardsView}>
        {createDailyCards()}
      </View>
    </View>
  );
}

// Styles for the DailyForecastCard and its elements
const styles = StyleSheet.create({
  DailyCardBase: {
    width: 330,
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  dailyCardsView: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    maxHeight: 320
  },
  eachCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    verticalAlign: 'middle',
    padding: 5,
    marginRight: 10,
  },
  dayStamp: {
    width: 90,
    height: 20,
    textAlign: 'left',
    verticalAlign: 'middle',
    fontFamily: 'Helvetica',
    fontWeight: '400',
    fontSize: 15,
  },
  dayTemps: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  dayTemp: {
    width: 30,
    fontFamily: 'Helvetica',
    fontSize: 15
  },
});