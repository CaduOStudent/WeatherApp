import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'expo-image'
import getWeatherImage from '@/utils/GetWeatherImages'
import { getWeatherData } from '@/utils/WeatherApi';
import { fetchUserLocation } from '@/utils/FetchUserLocation';
import { getAirQualityData } from '@/utils/AirQualityApi';
import { Dimensions } from 'react-native'
import formatValue from '@/utils/FormatValues'
import { weatherCodeDescriptions } from '../utils/WeatherCodes';

export default function CurrentLocationCard() {
    const [weatherCode, setWeatherCode] = useState<number>(0);
    const [userLat, setUserLat] = useState<number | null>(null);
    const [userLong, setUserLong] = useState<number | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [airQualityIndex, setAirQualityIndex] = useState<number | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [city, setCity] = useState<string>('Loading...')
    const [country, setCountry] = useState<string>('Loading...')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Clean location effect
    useEffect(() => {
        (async () => {
            try {
                const userLoc = await fetchUserLocation();
                setUserLat(userLoc.latitude);
                setUserLong(userLoc.longitude);
                setLocationError(null);
            } catch (err: any) {
                setLocationError(err.message || 'Failed to get user location');
            }
        })();
    }, []);

    useEffect(() => {
        async function fetchAirQuality() {
            if (userLat !== null && userLong !== null) {
                try {
                    const data = await getAirQualityData(userLat, userLong);
                    setAirQualityIndex(data.current.europeanAqi ?? null);
                } catch (err) {
                    setAirQualityIndex(null);
                }
            }
        }
        fetchAirQuality();
    }, [userLat, userLong]);

    useEffect(() => {
        async function fetchWeather() {
            if (userLat !== null && userLong !== null) {
                try {
                    const data = await getWeatherData(userLat, userLong);
                    setWeather(data);
                    setWeatherCode(data.current.weatherCode ?? 0);
                } catch (err) {
                    setWeather(null);
                    setWeatherCode(0);
                }
            }
        }
        fetchWeather();
    }, [userLat, userLong]);

    useEffect(() => {
        async function fetchData() {
            if (userLat !== null && userLong !== null) {
                try {
                    // Fetch weather data
                    const weatherData = await getWeatherData(userLat, userLong)
                    setWeather(weatherData)

                    // Fetch city/country using reverse geocoding
                    const geoRes = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${userLat}&lon=${userLong}&format=json`
                    )
                    const geoJson = await geoRes.json()
                    setCity(geoJson.address?.city || geoJson.address?.town || geoJson.address?.village || 'Unknown')
                    setCountry(geoJson.address?.country || 'Unknown')
                } catch (err: any) {
                    setError('Failed to load location or weather data')
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchData()
    }, [userLat, userLong])

    const backgroundImage = getWeatherImage(weatherCode);
    return (
        <View style={styles.cardBase}>
            <ImageBackground
                source={backgroundImage}
                style={styles.background}
                resizeMode="cover">

                <View style={styles.leftSide}>
                    <View style={styles.locationDesc}>
                        <Text style={styles.currentCity}>
                            {city},{' '}
                        </Text>
                        <Text style={styles.currentCountry}>
                            {country}
                        </Text>
                        <Text style={styles.myLoc}>
                            My Location
                        </Text>
                    </View>
                    <Text style={styles.locationCond}>
                        {weather?.current?.weatherCode !== undefined
                            ? weatherCodeDescriptions[weather.current.weatherCode] || `Code: ${weather.current.weatherCode}`
                            : 'Weather Condition'}
                    </Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.currentLocationTemp}>
                        {formatValue(weather?.current?.temperature2m) ?? '--'}º
                    </Text>
                    <View style={styles.locationHandLTemps}>
                        <Text style={styles.currentLocationHighandLow}>
                            L: {formatValue(weather?.daily?.temperature2mMin?.[0]) ?? '--'}º
                        </Text>
                        <Text style={styles.currentLocationHighandLow}>
                            H: {formatValue(weather?.daily?.temperature2mMax?.[0]) ?? '--'}º
                        </Text>
                    </View>

                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    cardBase: {
        minWidth: 300,
        borderRadius: 40,
        

    },
    background: {
       width: '100%',
       borderRadius: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        padding: 15

    },
    leftSide: {

    },
    locationDesc: {

    },
    currentCity: {

    },
    currentCountry: {

    },
    myLoc: {

    },
    locationCond: {

    },
    rightSide: {

    },
    currentLocationTemp: {

    },
    locationHandLTemps: {

    },
    currentLocationHighandLow: {

    }


})