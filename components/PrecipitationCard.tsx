import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import formatValue from '@/utils/FormatValues'

interface PrecipitationCardProps {
  weather: any;
}

export default function PrecipitationCard({ weather }: PrecipitationCardProps) {
  // Get today's precipitation (from daily data)
  const todayPrecip = weather?.daily?.rainSum?.[0] ?? 0;

  // Get future precipitation (e.g., next day's forecast)
  const futurePrecip = weather?.daily?.rainSum?.[1] ?? 0;

  // Optionally, you could use hourly data for more granularity

  return (
    <View style={styles.PrecipitationCardBase}>
      <View style={styles.PrecipitationCardTitle}>
        <Text>Precipitation</Text>
        <Ionicons name="water-outline" size={20} color="black" />
      </View>
      <View style={styles.div} />
      <View style={styles.PrecipitationAmount}>
        <Text style={styles.PrecipitationAmountValue}>
          {formatValue(todayPrecip)} mm
        </Text>
        <Text style={styles.PrecipitationAmountMoment}>
          Today
        </Text>
      </View>
      <View style={styles.div} />
      <Text style={styles.FuturePrecipitation}>
        {futurePrecip > 0
          ? `${formatValue(futurePrecip)} mm expected tomorrow`
          : 'No significant precipitation expected tomorrow'}
      </Text>
    </View>
  )
}

// ...styles unchanged...


const styles = StyleSheet.create({
  PrecipitationCardBase: {
    width: 140,
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 14,
    backgroundColor: 'rgba(143, 164, 193, 0.85)',
    marginTop: 10,
    marginBottom: 10,
    padding: 5
  },
  PrecipitationCardTitle: {
    width: '85%',
    height: 22,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,

  },
  div: {
    width: '95%',
    height: 2,
    backgroundColor: '#7A9AC9'
  },
  PrecipitationAmount: {
    width: '90%',
    height: 60,
    marginTop: 2,
    marginBottom: 2

  },
  PrecipitationAmountValue:{
    fontSize: 30,
    fontFamily: 'Helvetica',
    color: 'black',
    textAlign: 'left',
    verticalAlign: 'middle',
    padding: 2

  },
  PrecipitationAmountMoment:{
    fontSize: 15,
    fontFamily: 'Helvetica',
    color: 'black',
    textAlign: 'left',
    verticalAlign: 'middle',
    padding: 2
  },
  FuturePrecipitation: {
    maxWidth: '95%',
    maxHeight: 50,
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: 'black',
    verticalAlign: 'middle',
    textAlign: 'center',
    padding: 3

  }

});