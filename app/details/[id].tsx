import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
// Import weather and air quality APIs
import { getWeatherData } from '@/utils/WeatherApi';
import { getAirQualityData } from '@/utils/AirQualityApi';
// Import weather and info cards
import HourlyForecastCard from '@/components/HourlyForecastCard'
import DailyForecastCard from '@/components/DailyForecastCard'
import WindDetailsCard from '@/components/WindDetailsCard'
import UVIndexCard from '@/components/UVIndexCard'
import LocationDetails from '@/components/LocationDetails'
import FeelsLikeCard from '@/components/FeelsLikeCard'
import PrecipitationCard from '@/components/PrecipitationCard'
import AirQualityCard from '@/components/AirQualityCard'
import { Dimensions } from 'react-native'
import getWeatherImage from '@/utils/GetWeatherImages'
import Ionicons from '@expo/vector-icons/Ionicons';
// Import save location API for favorites
import { saveLocation, removeLocation, isLocationSaved, SavedLocation } from '@/utils/SaveLocationAPI';

// Get device dimensions for responsive design
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

export default function DetailsScreen() {
  // Get params from router (lat/lon/city/country/id)
  const { latitude, longitude, city, country, id } = useLocalSearchParams();

  // Parse lat/lon as numbers
  const lat = latitude ? parseFloat(latitude as string) : null;
  const lon = longitude ? parseFloat(longitude as string) : null;
  const locationId = id as string;

  // State for weather, air quality, favorite status, and animations
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [airQualityIndex, setAirQualityIndex] = useState<number | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [saved, setSaved] = useState(false); // Is this location saved?
  const [anim] = useState(new Animated.Value(1)); // Heart icon animation
  const router = useRouter();
  const [ellipsisAnim] = useState(new Animated.Value(1)); // Ellipsis icon animation

  // Compute local time string for the location
  let localTimeStr = '--';
  if (weather?.current?.time && weather?.timezone) {
    const utcDate = new Date(weather.current.time);
    localTimeStr = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: weather.timezone,
    }).format(utcDate);
  }

  // Animate and navigate to search when ellipsis is pressed
  const handleEllipsisPress = () => {
    Animated.sequence([
      Animated.timing(ellipsisAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(ellipsisAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      router.push('/search');
    });
  };

  // Check if location is saved (favorite) on mount or when locationId changes
  useEffect(() => {
    if (locationId) {
      isLocationSaved(locationId).then(setSaved);
    }
  }, [locationId]);

  // Animate heart icon when saving
  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 1.3, duration: 150, useNativeDriver: true, easing: Easing.ease }),
      Animated.timing(anim, { toValue: 1, duration: 150, useNativeDriver: true, easing: Easing.ease }),
    ]).start();
  };

  // Save or remove location from favorites
  const handleHeartPress = async () => {
    if (!lat || !lon || !city) return;
    if (saved) {
      await removeLocation(locationId);
      setSaved(false);
    } else {
      await saveLocation({
        id: locationId,
        name: typeof city === 'string' ? city : city[0],
        country: typeof country === 'string' ? country : (country ? country[0] : ''),
        latitude: lat,
        longitude: lon,
      });
      setSaved(true);
      animateHeart();
    }
  };

  // Fetch air quality data when lat/lon changes
  useEffect(() => {
    async function fetchAirQuality() {
      if (lat !== null && lon !== null) {
        try {
          const data = await getAirQualityData(lat, lon);
          setAirQualityIndex(data.current.europeanAqi ?? null);
        } catch (err) {
          setAirQualityIndex(null);
        }
      }
    }
    fetchAirQuality();
  }, [lat, lon]);

  // Fetch weather data when lat/lon changes
  useEffect(() => {
    async function fetchWeather() {
      if (lat !== null && lon !== null) {
        try {
          const data = await getWeatherData(lat, lon);
          setWeather(data);
          setWeatherCode(data.current.weatherCode ?? 0);
        } catch (err) {
          setWeather(null);
          setWeatherCode(0);
        }
      }
    }
    fetchWeather();
  }, [lat, lon]);

  // Get background image based on weather code
  const backgroundImage = getWeatherImage(weatherCode);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/search')} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={28} color="#222" />
          <Text style={styles.backText}>Back to Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={[styles.overlay]} bounces={false}>
        {/* Top icons: ellipsis (settings) and heart (favorite) */}
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={handleEllipsisPress} activeOpacity={0.7}>
            <Animated.View style={{ transform: [{ scale: ellipsisAnim }] }}>
              <Ionicons name="ellipsis-horizontal-outline" size={30} color='black' />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHeartPress} activeOpacity={0.7}>
            <Animated.View style={{ transform: [{ scale: anim }] }}>
              <Ionicons
                name={saved ? 'heart' : 'heart-outline'}
                size={30}
                color={saved ? 'red' : 'black'}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
        {/* Show error if location is invalid, otherwise show details */}
        {lat === null || lon === null ? (
          <Text>Invalid location.</Text>
        ) : (
          <LocationDetails
            latitude={lat}
            longitude={lon}
            localTime={localTimeStr}
          />
        )}

        {/* Weather and info cards */}
        <HourlyForecastCard weather={weather} />
        <DailyForecastCard weather={weather} />

        <View style={styles.smallCards}>
          <FeelsLikeCard
            apparentTemperature={weather?.current?.apparentTemperature}
            weatherCode={weather?.current?.weatherCode}
          />
          <WindDetailsCard weather={weather} />
        </View>

        <AirQualityCard airQualityIndex={airQualityIndex ?? 0} />

        <View style={styles.smallCards}>
          <UVIndexCard weather={weather} />
          <PrecipitationCard weather={weather} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// Styles for the details screen and its components
const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: device_width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'rgba(93, 92, 92, 0.75)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#222',
    verticalAlign: 'middle'
  },
  topIcons: {
    position: 'fixed',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -35
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: device_width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'auto',
    padding: 10,
    fontFamily: 'Helvetica',
  },
  background: {
    flex: 1,
    width: device_width,
    height: device_height,
  },
  overlay: {
    width: device_width,
    alignItems: 'center',
    display: 'flex',
    gap: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingTop: 30,
    paddingBottom: 40
  },
  smallCards: {
    width: 330,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});