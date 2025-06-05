import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useUnitSettings } from '../../utils/UnitSettingsContext';

export default function SettingsScreen() {
  const { settings, setSettings } = useUnitSettings();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Unit Settings</Text>
      <View style={styles.row}>
        <Text>Temperature (°C/°F):</Text>
        <Switch
          value={settings.tempMetric}
          onValueChange={v => setSettings({ tempMetric: v })}
        />
        <Text>{settings.tempMetric ? '°C' : '°F'}</Text>
      </View>
      <View style={styles.row}>
        <Text>Wind Speed (km/h, mi/h):</Text>
        <Switch
          value={settings.speedMetric}
          onValueChange={v => setSettings({ speedMetric: v })}
        />
        <Text>{settings.speedMetric ? 'km/h' : 'mi/h'}</Text>
      </View>
      <View style={styles.row}>
        <Text>Precipitation (mm/in):</Text>
        <Switch
          value={settings.precipMetric}
          onValueChange={v => setSettings({ precipMetric: v })}
        />
        <Text>{settings.precipMetric ? 'mm' : 'in'}</Text>
      </View>
      <View style={styles.row}>
        <Text>24h Time Format:</Text>
        <Switch
          value={settings.is24h}
          onValueChange={v => setSettings({ is24h: v })}
        />
        <Text>{settings.is24h ? '24h' : '12h'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 18, gap: 10 },
});