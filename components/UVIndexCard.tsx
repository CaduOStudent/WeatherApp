import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getSunProtectionRecommendation } from '../utils/SunProtectionRecomendation';

interface UVIndexCardProps {
  weather: any;
}

function getUVIndexClass(uv: number) {
  if (uv < 3) return "Low";
  if (uv < 6) return "Moderate";
  if (uv < 8) return "High";
  if (uv < 11) return "Very High";
  return "Extreme";
}

export default function UVIndexCard({ weather }: UVIndexCardProps) {
  // Find the UV index for the current hour
  let uvIndex = 0;
  if (weather?.hourly?.uvIndex && weather?.hourly?.time) {
    const now = new Date();
    const times = weather.hourly.time.map((t: string | Date) => t instanceof Date ? t : new Date(t));
    const idx = times.findIndex((t: Date) => t.getHours() === now.getHours() && t.getDate() === now.getDate());
    uvIndex = idx !== -1 ? weather.hourly.uvIndex[idx] : weather.hourly.uvIndex[0];
  }

  const uvClass = getUVIndexClass(uvIndex);
  const recommendation = getSunProtectionRecommendation({ uvIndex });

  // Move pointer: scale is 0-11+, so clamp and map to 0-128px (scaleBar width)
  const scaleWidth = 128;
  const pointerLeft = Math.min(Math.max(uvIndex, 0), 11) / 11 * scaleWidth;

  return (
    <View style={styles.UVCardBase}>
      <View style={styles.UVCardTitle}>
        <Text>UV Index</Text>
        <Ionicons name="sunny-outline" size={20} color="black" />
      </View>
      <View style={styles.div} />

      <View style={styles.UVIndexDetails} >
        <Text style={styles.UVIndex}>
          {Math.round(uvIndex)}
        </Text>
        <Text style={styles.UVIndexClass}>
          {uvClass}
        </Text>
      </View>

      <View style={styles.scaleBarContainer}>
        <LinearGradient
          colors={[
            '#0DFF00', '#469F41', '#688B22', '#C7D221', '#A9780E',
            '#AB0B0B', '#B40505', '#5E04A8'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.scaleBar}
        />
        <View style={[styles.scalePointer, { left: pointerLeft }]} />
      </View>
      <Text style={styles.UseSunProtection}>
        {recommendation}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  UVCardBase: {
    width: 155,
    maxHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 14,
    backgroundColor: 'rgba(143, 164, 193, 0.85)',
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  },
  UVCardTitle: {
    width: 135,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  div: {
    width: 145,
    height: 2,
    backgroundColor: '#7A9AC9'
  },
  UVIndexDetails: {
    width: 135,
    marginTop: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  UVIndex: {
    color: 'black',
    fontFamily: 'helvetica',
    fontSize: 23,
  },
  UVIndexClass: {
    color: 'black',
    fontFamily: 'helvetica',
    fontSize: 15,
  },
  scaleBarContainer: {
    width: 135,
    height: 20,
    justifyContent: 'center',
    position: 'relative',
    marginTop: 8,
  },
  scaleBar: {
    width: 128,
    height: 4,
    borderRadius: 20,
    position: 'absolute',
    left: 0,
    top: 8,
  },
  scalePointer: {
    position: 'absolute',
    top: 6,
    width: 7,
    height: 7,
    backgroundColor: '#FEFEFE',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 0.5,
    zIndex: 2,
  },
  UseSunProtection: {
    
    
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 15,
    verticalAlign: 'middle',
    textAlign: 'center',
    padding: 3
  },
});