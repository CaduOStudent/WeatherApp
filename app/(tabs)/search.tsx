import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { saveLocation, getSavedLocations, removeSavedLocation } from '@/utils/SaveLocationAPI';
import SavedLocationCard from '@/utils/SavedLocationCard'
import { Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchBar from '../../utils/SearchBar'; // or your custom SearchBar path
import CurrentLocationCard from '@/components/CurrentLocationCard';

const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

export default function search() {
  return (
    <View style={styles.body}>

      <View style={styles.TopSection}>
        <Text style={styles.title}>My Locations</Text>
        <Ionicons name="ellipsis-vertical-circle-outline" size={30} color='black' />
      </View>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search-outline" size={20} color='black' />
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          placeholderTextColor="#CCC"

        /*value={query}
        onChangeText={setQuery}*/
        />
        <Ionicons name="mic-outline" size={20} color='black' />
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.SavedCards}>
        <CurrentLocationCard />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    width: device_width,
    height: device_height,
    //backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20

  },
  TopSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(93, 92, 92, 0.60)'

  },
  title: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Helvetica',

  },
  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '95%',
    backgroundColor: 'rgba(93, 92, 92, 0.60)',
    borderRadius: 25,
    padding: 10,
  },
  input: {
    color: '#202020',
    fontSize: 20,
    textAlign: 'left',
    verticalAlign: 'middle',
    padding: 5,
    outline: 'none'
  },

  SavedCards: {

    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,

  },
})