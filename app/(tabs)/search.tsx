import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useFocusEffect } from 'expo-router';
import SearchAutocomplete from '@/utils/SearchAutocompletion';
import CurrentLocationCard from '@/components/CurrentLocationCard';
import LocationCard from '@/components/LocationCard';
import { getSavedLocations, SavedLocation } from '@/utils/SaveLocationAPI';

const device_width = 400;
const device_height = 800;

export default function Search() {
  const router = useRouter();
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

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

  const handleMicPress = () => { };

  // Refresh saved locations every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchSaved = async () => {
        const locs = await getSavedLocations();
        setSavedLocations(locs);
      };
      fetchSaved();
    }, [])
  );

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
          <CurrentLocationCard />
          {savedLocations.map(loc => (
            <TouchableOpacity
              key={loc.id}
              onPress={() => handlePlaceSelect({
                id: loc.id,
                name: loc.name,
                country: loc.country,
                latitude: loc.latitude,
                longitude: loc.longitude,
              })}
              activeOpacity={0.8}
            >
              <LocationCard
                city={loc.name}
                country={loc.country || ''}
                latitude={loc.latitude}
                longitude={loc.longitude}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  body: {
    flex:1,
    width: device_width,
    display: 'flex',
    flexDirection: 'column',
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
    flexGrow: 1,
    width: '95%',
    maxWidth: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 40
  },
});