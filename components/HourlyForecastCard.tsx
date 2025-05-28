import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getWeatherData } from '../utils/WeatherApi';
import { weatherCodeIonicons } from '../utils/WeatherCodes';
import formatValue from '@/utils/FormatValues';

interface HourlyForecastCardProps {
  weather: any;
}



export default function HourlyForecastCard({ weather }: HourlyForecastCardProps) {
  function createHourlyCards() {
    if (
      !weather?.hourly?.time ||
      !weather?.hourly?.temperature2m ||
      !weather?.hourly?.weatherCode
    ) return null;

    // Ensure all times are Date objects
    const times = weather.hourly.time.map((t: string | Date) => t instanceof Date ? t : new Date(t));

    const now = new Date();
    now.setMinutes(0, 0, 0);

    // Find the first index where the hour is >= current hour
    const firstIndex = times.findIndex((t: Date) => t >= now);
    const start = firstIndex === -1 ? 0 : firstIndex;

    return Array.from({ length: 24 }).map((_, i) => {
      const idx = start + i;
      if (
        idx >= times.length ||
        idx >= weather.hourly.temperature2m.length ||
        idx >= weather.hourly.weatherCode.length
      ) return null;

      const hourTime = times[idx];
      const temp = weather.hourly.temperature2m[idx];
      const code = weather.hourly.weatherCode[idx];
      const iconName = (weatherCodeIonicons[code] || "help") as React.ComponentProps<typeof Ionicons>["name"];
      const hourLabel = i === 0 ? "Now" : hourTime.getHours().toString().padStart(2, '0') + ":00";
      return (
        <View key={idx} style={styles.eachCard}>
          <Text style={styles.hourStamp}>{hourLabel}</Text>
          <Ionicons name={iconName} size={30} color='black' />
          <Text style={styles.hoursTemp}>{formatValue(temp)}º</Text>
        </View>
      );
    });
  }

  return (
    <View style={styles.CardBaseStyle}>
      <View style={styles.cardTitleDiv}>
        <Text style={styles.cardTitle}>Hourly forecast</Text>
        <Ionicons name="time-outline" size={20} color="black" />
      </View>
      <View style={styles.div} />
      <ScrollView horizontal bounces={false} style={styles.hourlyCards}>
        {createHourlyCards()}
      </ScrollView>
    </View>
  );
}

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

