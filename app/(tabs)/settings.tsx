import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
// Import context and API for unit settings
import { useUnitSettings } from '../../utils/UnitSettingsContext';

// Main Settings screen component
export default function Settings() {
  // Access current settings and setter from context
  const { settings, setSettings } = useUnitSettings();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Settings</Text>

      {/* Speed unit toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Speed (km/h / mi/h)</Text>
        <Switch
          value={settings.speedMetric}
          // Update only the speedMetric property in settings
          onValueChange={(val) => setSettings({ speedMetric: val })}
        />
        <Text style={styles.value}>{settings.speedMetric ? 'km/h' : 'mi/h'}</Text>
      </View>

      {/* Temperature unit toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Temperature (ºC / ºF)</Text>
        <Switch
          value={settings.tempMetric}
          // Update only the tempMetric property in settings
          onValueChange={(val) => setSettings({ tempMetric: val })}
        />
        <Text style={styles.value}>{settings.tempMetric ? 'ºC' : 'ºF'}</Text>
      </View>

      {/* Precipitation unit toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Precipitation (mm / in)</Text>
        <Switch
          value={settings.precipMetric}
          // Update only the precipMetric property in settings
          onValueChange={(val) => setSettings({ precipMetric: val })}
        />
        <Text style={styles.value}>{settings.precipMetric ? 'mm' : 'in'}</Text>
      </View>

      {/* Hour format toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Hour Format (24h / 12h)</Text>
        <Switch
          value={settings.is24h}
          // Update only the is24h property in settings
          onValueChange={(val) => setSettings({ is24h: val })}
        />
        <Text style={styles.value}>{settings.is24h ? '24h' : '12h'}</Text>
      </View>
    </View>
  );
}

// Styles for the Settings screen and its components
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