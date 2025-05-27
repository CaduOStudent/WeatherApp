import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'

type AirQualityCardProps = {
  airQualityIndex: number
}

export default function AirQualityCard({ airQualityIndex }: AirQualityCardProps) {
  function getAirQualityText(index: number) {
    if (index <= 2) return 'Good';
    if (index <= 4) return 'Moderate';
    if (index <= 6) return 'Unhealthy';
    return 'Very Unhealthy';
  }

  // Bar width must match styles.scaleBar.width
  const barWidth = 300;
  // Clamp index between 0 and 10
  const clampedIndex = Math.max(0, Math.min(airQualityIndex, 10));
  // Calculate pointer position
  const pointerLeft = (clampedIndex / 10) * barWidth - 2.5; // 2.5 = pointer width/2

  return (
    <View style={styles.airQualityCardBaseStyle}>
      <View style={styles.cardTitleDiv}>
        <Text style={styles.cardTitle}>Air Quality</Text>
        <Ionicons name="filter" size={20} color="black" />
      </View>
      <View style={styles.div} />
      <View style={styles.AQInfos}>
        <Text style={styles.AQIndex}>{airQualityIndex}</Text>
        <Text style={styles.AQText}>{getAirQualityText(airQualityIndex)}</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  airQualityCardBaseStyle: {
    width: 330,
    height: 115,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 14,
    backgroundColor: 'rgba(143, 164, 193, 0.85)',
    marginTop: 10,
    marginBottom: 10
  },
  cardTitleDiv: {
    width: 300,
    height: 22,
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
    backgroundColor: '#7A9AC9'
  },
  AQInfos: {
    width: 300,
    marginTop: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  AQIndex: {
    color: 'black',
    fontFamily: 'helvetica',
    fontSize: 23,
  },
  AQText: {
    color: 'black',
    fontFamily: 'helvetica',
    fontSize: 15,
  },
  scaleBarContainer: {
    width: 300,
    height: 20,
    justifyContent: 'center',
    position: 'relative',
    marginTop: 8,
  },
  scaleBar: {
    width: 300,
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
  }
})