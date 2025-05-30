import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { weatherCodeDescriptions, weatherCodeIonicons } from '../utils/WeatherCodes';
import formatValue from '@/utils/FormatValues';

interface WeatherInfoProps {
  weatherCode: number;
  temperature: number | null | undefined;
  label?: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherCode, temperature, label }) => {
  const iconName = weatherCodeIonicons[weatherCode] || 'help';
  const description = weatherCodeDescriptions[weatherCode] || `Code: ${weatherCode}`;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Ionicons name={iconName as any} size={40} color="#222" style={styles.icon} />
      <Text style={styles.temp}>{formatValue(temperature)}º</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  icon: {
    marginVertical: 4,
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 2,
  },
  desc: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default WeatherInfo;