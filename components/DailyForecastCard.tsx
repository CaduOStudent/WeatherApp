import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getWeatherData } from '../utils/WeatherApi';
import { weatherCodeIonicons } from '../utils/WeatherCodes';
import formatValue from '@/utils/FormatValues';

interface DailyForecastCardProps {
  weather: any;
}
export default function DailyForecastCard({ weather }: DailyForecastCardProps) {
  const daily = weather?.daily;

  function createDailyCards() {
    if (!daily || !daily.time || !daily.temperature2mMax || !daily.temperature2mMin || !daily.weatherCode) return null;

    const times = daily.time.map((t: string | Date) => t instanceof Date ? t : new Date(t));
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return Array.from({ length: 10 }).map((_, i) => {
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
      const iconName = (weatherCodeIonicons[code] || "help") as React.ComponentProps<typeof Ionicons>["name"];
      const dayLabel = i === 0 ? "Today" : weekDays[dayTime.getDay()];

      return (
        <View key={i} style={styles.eachCard}>
          <Text style={styles.dayStamp}>{dayLabel}</Text>
          <Ionicons name={iconName} size={30} color='black' />
          <View style={styles.dayTemps}>
            <Text style={styles.dayTemp}>{formatValue(minDailyTemp)}º</Text>
            <Text style={styles.dayTemp}>{formatValue(maxDailyTemp)}º</Text>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={styles.DailyCardBase}>
      <View style={styles.cardTitleDiv}>
        <Text style={styles.cardTitle}>10-Day Forecast</Text>
        <Ionicons name="calendar-outline" size={20} color="black" />
      </View>
      <View style={styles.div} />
      <View style={styles.dailyCardsView}>
        {createDailyCards()}
      </View>
    </View>
  );
}

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
    fontWeight: 400,
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
