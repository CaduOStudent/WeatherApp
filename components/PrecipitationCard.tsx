import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getClothesRecommendation } from '../utils/ClothesRecomendations'
import formatValue from '@/utils/FormatValues'

export default function PrecipitationCard() {
  return (
    <View style={styles.PrecipitationCardBase}>
      <View style={styles.PrecipitationCardTitle}>
        <Text>Preciptation</Text>
        <Ionicons name="water-outline" size={20} color="black" />
      </View>
      <View style={styles.div} />
      <View style={styles.PrecipitationAmount}>
        <Text style={styles.PrecipitationAmountValue}>
          4 mm
        </Text>
        <Text style={styles.PrecipitationAmountMoment}>
          Today
        </Text>

      </View>
      <View style={styles.div} />
      <Text style={styles.FuturePrecipitation}>
        2 mm expected later
      </Text>
    </View>
  )
}


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