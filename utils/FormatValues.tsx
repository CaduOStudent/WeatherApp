import { View, Text } from 'react-native'
import React from 'react'

export default function formatValue(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(Number(value))) return '--';
    return Math.round(Number(value)).toString();
}