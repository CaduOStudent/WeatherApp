import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import SearchAutocomplete from '@/utils/SearchAutocompletion';
import CurrentLocationCard from '@/components/CurrentLocationCard';

const device_width = 400;
const device_height = 800;

export default function Search() {
  const router = useRouter();

  const handlePlaceSelect = (place: { id?: any; latitude: any; longitude: any; name: any; country?: any; }) => {
    router.push({
      pathname: `/details/[id]`,
      params: {
        id: place.id || `${place.latitude},${place.longitude}`,
        city: place.name,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude,
      }
    });
  };

  // Dummy mic handler for Expo Go
  const handleMicPress = () => {
    // You can show an alert or do nothing
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.body}>
        <View style={styles.TopSection}>
          <Text style={styles.title}>My Locations</Text>
          <Ionicons name="ellipsis-vertical-circle-outline" size={30} color='black' />
        </View>
        <View style={styles.searchBarContainer}>
          <SearchAutocomplete onPlaceSelect={handlePlaceSelect} onMicPress={handleMicPress} />
        </View>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.SavedCards}>
            <CurrentLocationCard/>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  body: {
    width: device_width,
    height: device_height,
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
    backgroundColor: 'rgba(93, 92, 92, 0.75)'
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Helvetica',
  },
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 10,

  },
  SavedCards: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});