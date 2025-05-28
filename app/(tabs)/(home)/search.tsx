import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { setUnitSettings, getUnitSettings } from '@/utils/MesuresChangeAPI';

export default function Settings() {
    const [isMetric, setIsMetric] = useState(getUnitSettings().isMetric);
    const [is24h, setIs24h] = useState(getUnitSettings().is24h);

    const handleUnitChange = (newMetric: boolean) => {
        setIsMetric(newMetric);
        setUnitSettings({ isMetric: newMetric, is24h });
    };

    const handleHourChange = (new24h: boolean) => {
        setIs24h(new24h);
        setUnitSettings({ isMetric, is24h: new24h });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.settingRow}>
                <Text style={styles.label}>Speed (km/h / mi/h)</Text>
                <Switch
                    value={isMetric}
                    onValueChange={() => setIsMetric(!isMetric)}
                />
                <Text style={styles.value}>{isMetric ? 'km/h' : 'mi/h'}</Text>
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.label}>Temperature (ºC / ºF)</Text>
                <Switch
                    value={isMetric}
                    onValueChange={() => setIsMetric(!isMetric)}
                />
                <Text style={styles.value}>{isMetric ? 'ºC' : 'ºF'}</Text>
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.label}>Precipitation (mm / in)</Text>
                <Switch
                    value={isMetric}
                    onValueChange={() => setIsMetric(!isMetric)}
                />
                <Text style={styles.value}>{isMetric ? 'mm' : 'in'}</Text>
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.label}>Hour Format (24h / 12h)</Text>
                <Switch
                    value={is24h}
                    onValueChange={() => setIs24h(!is24h)}
                />
                <Text style={styles.value}>{is24h ? '24h' : '12h'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    label: {
        flex: 1,
        fontSize: 16,
    },
    value: {
        width: 50,
        textAlign: 'right',
        fontSize: 16,
        color: '#333',
    },
});