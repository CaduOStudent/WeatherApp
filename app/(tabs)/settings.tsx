import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { setUnitSettings, getUnitSettings } from '@/utils/MesuresChangeAPI';

import { useUnitSettings } from '../../utils/UnitSettingsContext';

export default function Settings() {
  const { settings, setSettings } = useUnitSettings();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Speed (km/h / mi/h)</Text>
        <Switch
          value={settings.speedMetric}
          onValueChange={(val) => setSettings({ speedMetric: val })}
        />
        <Text style={styles.value}>{settings.speedMetric ? 'km/h' : 'mi/h'}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Temperature (ºC / ºF)</Text>
        <Switch
          value={settings.tempMetric}
          onValueChange={(val) => setSettings({ tempMetric: val })}
        />
       
        <Text style={styles.value}>{settings.tempMetric ? 'ºC' : 'ºF'}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Precipitation (mm / in)</Text>
        <Switch
          value={settings.precipMetric}
          onValueChange={(val) => setSettings({ precipMetric: val })}
        />
        <Text style={styles.value}>{settings.precipMetric ? 'mm' : 'in'}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Hour Format (24h / 12h)</Text>
        <Switch
          value={settings.is24h}
          onValueChange={(val) => setSettings({ is24h: val })}
        />
        <Text style={styles.value}>{settings.is24h ? '24h' : '12h'}</Text>
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