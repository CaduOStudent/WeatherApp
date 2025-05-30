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
const device_width = Dimensions.get('window').width
const device_height = Dimensions.get('window').height

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
                contentFit='cover'

            >


                <View style={styles.leftSide}>
                    <View style={styles.locationDesc}>
                        <Text style={styles.currentCity}>
                            {city},{' '}
                        </Text>
                        <Text style={styles.currentCountry}>
                            {country}
                        </Text>
                    </View>
                    <Text style={styles.myLoc}>
                        My Location
                    </Text>
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
        width: '90%',
        borderRadius: 40,
        overflow: 'hidden', // <-- This clips the background image to the border radius
        backgroundColor: '#fff', // Optional: fallback color

    },
    background: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        padding: 15,
        minHeight: 145
    },
    leftSide: {
        minWidth: 170,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(143, 164, 193, 0.37)'

    },
    locationDesc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 28
    },
    currentCity: {
        color: 'rgb(249, 246, 246)',
        fontSize: 21,
        fontFamily: 'Helvetica',
        verticalAlign: 'bottom'

    },
    currentCountry: {
        color: 'rgba(247, 247, 247, 0.83)',
        fontSize: 18,
        fontFamily: 'Helvetica',
        verticalAlign: 'bottom'
    },
    myLoc: {
        color: 'rgb(245, 244, 244)',
        fontSize: 18,
        fontFamily: 'Helvetica',
        verticalAlign: 'bottom',

    },
    locationCond: {
        color: 'rgb(245, 244, 244)',
        fontSize: 12,
        fontFamily: 'Helvetica',
        verticalAlign: 'bottom',
    },
    rightSide: {
        minWidth: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(143, 164, 193, 0.37)'

    },
    currentLocationTemp: {
        color: 'rgb(249, 246, 246)',
        fontSize: 40,
        fontFamily: 'Helvetica',
        

    },
    locationHandLTemps: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 10

    },
    currentLocationHighandLow: {
        color: 'rgb(249, 246, 246)',
        fontSize: 12,
        fontFamily: 'Helvetica',
    }


})