import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
// Utility to fetch weather data from API
import { getWeatherData } from '../utils/WeatherApi'
// Utility to format temperature and other values
import formatValue from '@/utils/FormatValues'
// Weather code descriptions for display
import { weatherCodeDescriptions } from '../utils/WeatherCodes';

interface LocationDetailsProps {
    latitude: number
    longitude: number
    localTime: string
}

// Main component to display details for a specific location
export default function LocationDetails({ latitude, longitude, localTime }: LocationDetailsProps) {

    // State for city/country, weather, loading, and error
    const [city, setCity] = useState<string>('Loading...')
    const [country, setCountry] = useState<string>('Loading...')
    const [weather, setWeather] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch weather and reverse geocoding data when latitude/longitude changes
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch weather data
                const weatherData = await getWeatherData(latitude, longitude)
                setWeather(weatherData)

                // Fetch city/country using reverse geocoding
                const geoRes = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
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
        fetchData()
    }, [latitude, longitude])

    // Show loading spinner if data is being fetched
    if (loading) {
        return (
            <View style={styles.currentLocationTitle}>
                <ActivityIndicator size="large" color="#1D4972" />
            </View>
        );
    }

    // Show error message if data failed to load
    if (error) {
        return (
            <View style={styles.currentLocationTitle}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.currentLocationTitle}>
            {/* City and country */}
            <View style={styles.currentLocationNameInfos}>
                <Text style={styles.currentCity}>
                    {city},{' '}
                </Text>
                <Text style={styles.currentCountry}>
                    {country}
                </Text>
            </View>
            {/* Current temperature */}
            <Text style={styles.currentLocationTemp}>
                {formatValue(weather?.current?.temperature2m) ?? '--'}º
            </Text>
            {/* Weather condition description */}
            <Text style={styles.currentLocationCondition}>
                {weather?.current?.weatherCode !== undefined
                    ? weatherCodeDescriptions[weather.current.weatherCode] || `Code: ${weather.current.weatherCode}`
                    : 'Weather Condition'}
            </Text>
            {/* High and low temperatures */}
            <View style={styles.currentLocationTemps}>
                <Text style={styles.currentLocationHighandLow}>
                    L: {formatValue(weather?.daily?.temperature2mMin?.[0]) ?? '--'}º
                </Text>
                <Text style={styles.currentLocationHighandLow}>
                    H: {formatValue(weather?.daily?.temperature2mMax?.[0]) ?? '--'}º
                </Text>
            </View>
            {/* Local time string, if provided */}
            <Text style={styles.currentLocationCondition}>
                Local Time: {localTime}
            </Text>
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
        fontWeight: '600',
    },
    currentLocationCondition: {
        fontSize: 15,
        color: '#1D4972',
        fontWeight: '500'
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
        fontWeight: '500'
    },
    currentCountry: {
        color: '#000',
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