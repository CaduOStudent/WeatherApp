import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useFocusEffect } from 'expo-router';
import SearchAutocomplete from '@/utils/SearchAutocompletion';
import CurrentLocationCard from '@/components/CurrentLocationCard';
import LocationCard from '@/components/LocationCard';
import { getSavedLocations, SavedLocation } from '@/utils/SaveLocationAPI';

const device_width = 400;
const device_height = 800;

// Main Search screen component
export default function Search() {
  const router = useRouter(); // For navigation
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]); // State for saved locations
  const [ellipsisAnim] = useState(new Animated.Value(1)); // Animation value for ellipsis icon

  // Handles animation and navigation to settings when ellipsis is pressed
  const handleEllipsisPress = () => {
    Animated.sequence([
      Animated.timing(ellipsisAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(ellipsisAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      router.push('/settings');
    });
  };

  // Navigates to the details page for the selected location
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

  // Placeholder for mic/voice search (not implemented)
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
    // Dismiss keyboard and suggestions when tapping outside
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.body}>
        {/* Top section with title and animated ellipsis/settings icon */}
        <View style={styles.TopSection}>
          <Text style={styles.title}>My Locations</Text>
          <TouchableOpacity onPress={handleEllipsisPress} activeOpacity={0.7}>
            <Animated.View style={{ transform: [{ scale: ellipsisAnim }] }}>
              <Ionicons name="ellipsis-vertical-outline" size={30} color='black' />
            </Animated.View>
          </TouchableOpacity>
        </View>
        {/* Search bar with autocomplete and mic */}
        <View style={styles.searchBarContainer}>
          <SearchAutocomplete onPlaceSelect={handlePlaceSelect} onMicPress={handleMicPress} />
        </View>
        {/* Scrollable list of current and saved locations */}
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.SavedCards}>
          {/* Card for current location */}
          <CurrentLocationCard />
          {/* Cards for each saved location, pressable to go to details */}
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

// Styles for the Search screen and its components
const styles = StyleSheet.create({
  body: {
    flex:1, // Allow ScrollView to expand and scroll
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