import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getWeatherData } from '../utils/WeatherApi'
import formatValue from '@/utils/FormatValues'

interface LocationDetailsProps {
    latitude: number
    longitude: number
}

export default function LocationDetails({ latitude, longitude }: LocationDetailsProps) {

    const [city, setCity] = useState<string>('Loading...')
    const [country, setCountry] = useState<string>('Loading...')
    const [weather, setWeather] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

    return (
        <View style={styles.currentLocationTitle}>
            <View style={styles.currentLocationNameInfos}>
                <Text style={styles.currentCity}>
                    {city},{' '}
                </Text>
                <Text style={styles.currentCountry}>
                    {country}
                </Text>
            </View>
            <Text style={styles.currentLocationTemp}>
                {formatValue(weather?.current?.temperature2m)?? '--'}º
            </Text>
            <Text style={styles.currentLocationCondition}>
                {weather?.current?.weatherCode !== undefined ? `Code: ${weather.current.weatherCode}` : 'Weather Condition'}
            </Text>
            <View style={styles.currentLocationTemps}>
                <Text style={styles.currentLocationHighandLow}>
                    H: {formatValue(weather?.daily?.temperature2mMax?.[0]) ?? '--'}º
                </Text>
                <Text style={styles.currentLocationHighandLow}>
                    L: {formatValue(weather?.daily?.temperature2mMin?.[0]) ?? '--'}º
                </Text>
            </View>
        </View>
        /* Mock details
            <View style={styles.currentLocationTitle}>
            <View style={styles.currentLocationNameInfos}>
                <Text style={styles.currentCity}>
                    City Name,{' '}
                </Text>
                <Text style={styles.currentCountry}>
                    Country
                </Text>
            </View>
            <Text style={styles.currentLocationTemp}>
                12º
            </Text>
            <Text style={styles.currentLocationCondition}>
                Weather Condition
            </Text>
            <View style={styles.currentLocationTemps}>
                <Text style={styles.currentLocationHighandLow}>
                    H: 5º
                </Text>
                <Text style={styles.currentLocationHighandLow}>
                    L: 11º
                </Text>
            </View>
        </View> */
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
        fontWeight: 600,

    },
    currentLocationCondition: {
        fontSize: 15,
        color: '#1D4972',
        fontWeight: 500
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
        fontWeight: 500

    },
    currentCountry: {
        color: '000',
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