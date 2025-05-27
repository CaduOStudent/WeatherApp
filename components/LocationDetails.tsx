import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function LocationDetails() {
  return (
    <View style={styles.currentLocationTitle}>
              <View style={styles.currentLocationNameInfos}>
                <Text style={styles.currentCity}>
                  City Name,{' '}
                </Text>
                <Text style={styles.currentCountry}>
                   Country
                </Text>
              </View>
              <Text style={styles.currentLocationTemp}>
                12º
              </Text>
              <Text style={styles.currentLocationCondition}>
                Weather Condition
              </Text>
              <View style={styles.currentLocationTemps}>
                <Text style={styles.currentLocationHighandLow}>
                  H: 5º
                </Text>
                <Text style={styles.currentLocationHighandLow}>
                  L: 11º
                </Text>
              </View>
            </View>
  )
}

const styles = StyleSheet.create({
  currentLocationTitle: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#F5F5F5',
    backgroundColor: 'rgba(143, 164, 193, 0.44)',
    borderRadius: 20,
    gap: 5,
    padding: 10,
    margin: 5
  },
  currentLocationTemp: {
    width: 110,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: 60,
    color: '#F5F5F5',
    fontWeight: 600,

  },
  currentLocationCondition: {
    fontSize: 15,
    color: '#1D4972',
    fontWeight: 500
  },
  currentLocationNameInfos: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 5

  },
  currentCity: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: 500

  },
  currentCountry: {
    color: '000',
    fontSize: 17,

  },
  currentLocationTemps: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,


  },
  currentLocationHighandLow: {
    fontSize: 17,
    color: '#fff'


  }
});