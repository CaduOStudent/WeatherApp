import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getClothesRecommendation } from '../utils/ClothesRecomendations'
import formatValue from '@/utils/FormatValues'

interface FeelsLikeCardProps {
    apparentTemperature: number | null | undefined;
    weatherCode: number | null | undefined;
}

export default function FeelsLikeCard({ apparentTemperature, weatherCode }: FeelsLikeCardProps) {
    const recommendation = getClothesRecommendation({
        temperature: apparentTemperature ?? 0,
        weatherCode: weatherCode ?? 0,
    });

    return (
        <View style={styles.FeelsLikeCardBase}>
            <View style={styles.FeelsLikeCardTitle}>
                <Text>Feels Like</Text>
                <Ionicons name="thermometer-outline" size={20} color="black" />
            </View>
            <View style={styles.div} />
            <Text style={styles.FeelsLikeTemp}>
                {apparentTemperature !== null && apparentTemperature !== undefined
                    ? `${formatValue(apparentTemperature)}º`
                    : '--'}
            </Text>
            <View style={styles.div} />
            <Text style={styles.ClothesRecomendation}>
                {recommendation}
            </Text>
        </View>
    )
}



const styles = StyleSheet.create({
    FeelsLikeCardBase: {
        width: 120,
        height: 115,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 14,
        backgroundColor: 'rgba(143, 164, 193, 0.85)',
        marginTop: 10,
        marginBottom: 10,
        padding: 5
    },
    FeelsLikeCardTitle: {
        width: 100,
        height: 22,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 24,

    },
    div: {
        width: 110,
        height: 2,
        backgroundColor: '#7A9AC9'
    },
    FeelsLikeTemp: {
        width: 60,
        height: 30,
        fontSize: 25,
        fontFamily: 'Helvetica',
        color: 'black',
        textAlign: 'center',
        verticalAlign: 'middle',
        marginTop: 2,
        marginBottom: 2
    },
    ClothesRecomendation: {
       maxWidth: 120,
        maxHeight: 50,
        color: 'black',
        fontFamily: 'Helvetica',
        fontSize: 12,
        verticalAlign: 'middle',
        textAlign: 'center',
        padding: 3

    }

});