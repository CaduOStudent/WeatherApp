import { Link } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Button,
  Animated
} from 'react-native';
import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';


import * as Location from 'expo-location'; // <-- Add this import

import SearchBar from "../../../utils/SearchBar";
import WeatherInfo from "../../../utils/WeatherInfo";
import AirQuality from "../../../utils/AirQuality";
import { useRef } from 'react';
import { Easing, useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import SearchAutocomplete from '@/utils/SearchAutocompletion';

type LocationType = {
  latitude: number;
  longitude: number;
  [key: string]: any;
};

interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
}


export default function HomeScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
  };

  // Use expo-location to get user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLatitude(loc.coords.latitude);
      setLongitude(loc.coords.longitude);
    })();
  }, []);

  const handleSearchResults = (results: string | any[]) => {
    if (results.length > 0) {
      setLocation(results[0]);
    }
  };

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <ScrollView>
        <Text style={[styles.link]}>Home</Text>

        <View style={styles.container}>
      <SearchAutocomplete onPlaceSelect={handlePlaceSelect} />
      {selectedPlace ? (
        <>
          <WeatherInfo
            latitude={selectedPlace.latitude}
            longitude={selectedPlace.longitude}
          />
          <AirQuality
            latitude={selectedPlace.latitude}
            longitude={selectedPlace.longitude}
          />
        </>
      ) : (
        <Text style={styles.infoText}>
          Start typing to see location suggestions.
        </Text>
      )}
    </View>

        <View style={styles.location}>
          {errorMsg ? (
            <Text>{errorMsg}</Text>
          ) : latitude && longitude ? (
            <>
              <WeatherInfo latitude={latitude} longitude={longitude} />
              <AirQuality latitude={latitude} longitude={longitude} />
            </>
          ) : (
            <Text>Waiting for location...</Text>
          )}
        </View>

        <View style={styles.container}>
          <Ionicons name="checkmark-circle" size={32} color="green" />
        </View>
        <Link
          style={[styles.link]}
          href={{
            pathname: '/details/[id]',
            params: { id: 'bacon' },
          }}>
          View user details
        </Link>
        <Link
          style={[styles.link]}
          href={{
            pathname: '/details/[id]',
            params: { id: 'chester' },
          }}>
          View user details
        </Link>
        <View style={styles.searchCard}>
          <SearchBar onSearch={handleSearchResults} />
          {location && (
            <>
              <WeatherInfo latitude={location.latitude} longitude={location.longitude} />
              <AirQuality latitude={location.latitude} longitude={location.longitude} />
            </>
          )}
        </View>
        <View style={styles.container}>
          <Animated.View style={[styles.box, style]} />
          <Button
            title="toggle"
            onPress={() => {
              randomWidth.value = Math.random() * 350;
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 70,
    fontFamily: 'Helvetica Neue',
    borderRadius: 10,
  },
  infoText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  location: {
    width: '90%',
    maxHeight: 400,
    color: 'light-gray',
    borderRadius: 20,
    backgroundColor: 'light-blue'

  },
  searchCard: {
    borderRadius: 24,
    backgroundColor: "#555",
    padding: 20,

  },
  lightContainer: {
    backgroundColor: '#f0f0f0',
  },
  darkContainer: {
    backgroundColor: 'white',

  },
  link: {
    fontSize: 18,
    marginVertical: 10,
    borderRadius: 5,
    padding: 10,
  },
  lightThemeText: {
    color: '#000',
  },
  darkThemeText: {
    color: '#fff',
  },
  box: {
    width: 100,
    height: 80,
    backgroundColor: 'black',
    margin: 30,
  },
});

