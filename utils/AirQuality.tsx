import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

interface WindDetailsCardProps {
  weather: any;
}

// Helper function to convert wind direction in degrees to compass direction (e.g., N, NE, E, etc.)
function getWindDirection(degrees: number | null | undefined): string {
  if (degrees === null || degrees === undefined) return '--';
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  return dirs[Math.round((degrees % 360) / 45)];
}

// Main component to display wind speed, gusts, and direction
export default function WindDetailsCard({ weather }: WindDetailsCardProps) {
  // Extract wind speed, gusts, and direction from weather data
  const windSpeed = weather?.current?.windSpeed10m ?? '--';
  const windGusts = weather?.current?.windGusts10m ?? '--';
  const windDirection = weather?.current?.windDirection10m ?? '--';
  // Convert wind direction in degrees to compass label
  const windDirLabel = getWindDirection(windDirection);

  return (
    <View style={styles.WindCardBase}>
      {/* Top section: title and icon */}
      <View style={styles.WindCardTop}>
        <View style={styles.WindCardTitle}>
          <Text>Wind</Text>
          <Ionicons name="paper-plane-outline" size={20} color="black" />
        </View>
        <View style={styles.divLarge} />
      </View>

      {/* Middle section: wind details and main direction */}
      <View style={styles.WindCardMiddle}>
        <View style={styles.WindCardMiddleLeft}>
          {/* Wind speed */}
          <View style={styles.WindDetails}>
            <Text style={styles.WindDetailParam}>Wind</Text>
            <Text style={styles.WindDetailValue}>
              {windSpeed !== '--' ? `${Math.round(windSpeed)} km/h` : '--'}
            </Text>
          </View>
          <View style={styles.divSmall} />
          {/* Wind gusts */}
          <View style={styles.WindDetails}>
            <Text style={styles.WindDetailParam}>Gusts</Text>
            <Text style={styles.WindDetailValue}>
              {windGusts !== '--' ? `${Math.round(windGusts)} km/h` : '--'}
            </Text>
          </View>
          <View style={styles.divSmall} />
          {/* Wind direction in degrees */}
          <View style={styles.WindDetails}>
            <Text style={styles.WindDetailParam}>Direction</Text>
            <Text style={styles.WindDetailValue}>
              {windDirection !== '--' ? `${Math.round(windDirection)}º` : '--'}
            </Text>
          </View>
        </View>
        {/* Main wind direction as compass label (e.g., N, NE, E) */}
        <Text style={styles.WindMainDirection}>
          {windDirLabel}
        </Text>
      </View>
    </View>
  )
}

// Styles for the WindDetailsCard and its elements
const styles = StyleSheet.create({
  WindCardBase: {
    width: 190,
    height: 115,
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
  WindCardTop: {
    width: 170,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3
  },
  WindCardTitle: {
    width: 170,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
  },
  divLarge: {
    width: 165,
    height: 2,
    backgroundColor: '#7A9AC9'
  },
  WindCardMiddle: {
    width: 170,
    minHeight: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  WindCardMiddleLeft: {
    width: 110,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 5,
    alignItems: 'flex-start'
  },
  WindDetails: {
    width: 100,
    height: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent : 'space-between',
    alignItems: 'center'
  },
  WindDetailParam: {
    color: '#474747',
    fontFamily: 'Helvetica',
    fontSize: 11,
    verticalAlign: 'middle',
    textAlign: 'left',
    padding: 3,
  },
  WindDetailValue: {
    color: '#474747',
    fontFamily: 'Helvetica',
    verticalAlign: 'middle',
    textAlign: 'right',
    fontSize: 11,
    padding: 3,
  },
  divSmall: {
    width: 100,
    height: 2,
    backgroundColor: '#7A9AC9'
  },
  WindMainDirection: {
    width: 55,
    height: 40,
    fontSize: 30,
    fontFamily: 'Helvetica',
    color: 'black',
    textAlign: 'center',
    verticalAlign: 'middle',
    marginTop: 2,
    marginBottom: 2
  },
});