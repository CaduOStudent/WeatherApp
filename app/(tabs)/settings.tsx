import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { setUnitSettings, getUnitSettings } from '@/utils/MesuresChangeAPI';

export default function Settings() {
  const initial = getUnitSettings();
  const [speedMetric, setSpeedMetric] = useState(initial.speedMetric);
  const [tempMetric, setTempMetric] = useState(initial.tempMetric);
  const [precipMetric, setPrecipMetric] = useState(initial.precipMetric);
  const [is24h, setIs24h] = useState(initial.is24h);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Speed (km/h / mi/h)</Text>
        <Switch
          value={speedMetric}
          onValueChange={(val) => {
            setSpeedMetric(val);
            setUnitSettings({ speedMetric: val });
          }}
        />
        <Text style={styles.value}>{speedMetric ? 'km/h' : 'mi/h'}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Temperature (ºC / ºF)</Text>
        <Switch
          value={tempMetric}
          onValueChange={(val) => {
            setTempMetric(val);
            setUnitSettings({ tempMetric: val });
          }}
        />
        <Text style={styles.value}>{tempMetric ? 'ºC' : 'ºF'}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Precipitation (mm / in)</Text>
        <Switch
          value={precipMetric}
          onValueChange={(val) => {
            setPrecipMetric(val);
            setUnitSettings({ precipMetric: val });
          }}
        />
        <Text style={styles.value}>{precipMetric ? 'mm' : 'in'}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Hour Format (24h / 12h)</Text>
        <Switch
          value={is24h}
          onValueChange={(val) => {
            setIs24h(val);
            setUnitSettings({ is24h: val });
          }}
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