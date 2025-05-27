import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function HourlyForecastCard() {
  function createHourlyCards() {
    return Array.from({ length: 24 }).map((_, index) => (

      <View key={index} style={styles.eachCard}>
        <Text style={styles.hourStamp}>
          Now{index}
        </Text>
        <Ionicons name='partly-sunny-outline' size={30} color='black' />
        <Text style={styles.hoursTemp}>
          11º
        </Text>
      </View>
    ));
  }
  return (
    <View style={styles.CardBaseStyle}>

      <View style={styles.cardTitleDiv}>
        <Text style={styles.cardTitle}>Hourly forecast</Text>
        <Ionicons name="time-outline" size={20} color="black" />
      </View>
      <View style={styles.div} />

      <ScrollView
        horizontal
        bounces={false}
        style={styles.hourlyCards}>
        {/* Cards for the hourly forecast */}

        {createHourlyCards()}


      </ScrollView>

    </View>
  )

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

