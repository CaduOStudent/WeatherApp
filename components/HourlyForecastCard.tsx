import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getWeatherData } from '../utils/WeatherApi';
import { weatherCodeIonicons } from '../utils/WeatherCodes';
import formatValue from '@/utils/FormatValues';

interface HourlyForecastCardProps {
  latitude: number | null;
  longitude: number | null;
}

export default function HourlyForecastCard({ latitude, longitude }: HourlyForecastCardProps) {
  const [hourly, setHourly] = useState<{
    time: Date[];
    temperature2m: number[];
    weatherCode: number[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      if (latitude == null || longitude == null) {
        setHourly(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await getWeatherData(latitude, longitude);
        setHourly({
          time: data.hourly.time,
          temperature2m: data.hourly.temperature2m,
          weatherCode: data.hourly.weatherCode,
        });
      } catch (err) {
        setHourly(null);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [latitude, longitude]);


  function createHourlyCards() {
    if (!hourly) return null;
    const now = new Date();
    // Find the first index >= now
    const firstIndex = hourly.time.findIndex(t => t >= now);
    const start = firstIndex === -1 ? 0 : firstIndex;

    return Array.from({ length: 24 }).map((_, i) => {
      const idx = start + i;
      const hourTime = hourly.time[idx];
      const temp = hourly.temperature2m[idx];
      const code = hourly.weatherCode[idx];
      const iconName = weatherCodeIonicons[code] || "help";
      const hourLabel =
        i === 0
          ? "Now"
          : hourTime
            ? hourTime.getHours().toString().padStart(2, '0') + ":00"
            : "--:--";
      return (
        <View key={idx} style={styles.eachCard}>
          <Text style={styles.hourStamp}>{hourLabel}</Text>
          <Ionicons name={iconName as React.ComponentProps<typeof Ionicons>['name']} size={30} color='black' />
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
        {loading ? <Text>Loading...</Text> : createHourlyCards()}
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

