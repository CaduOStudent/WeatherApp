// components/AirQuality.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface AirQualityProps {
  latitude: number;
  longitude: number;
}

const AirQuality: React.FC<AirQualityProps> = ({ latitude, longitude }) => {
  const [airQuality, setAirQuality] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const response = await fetch(
          `https://air-quality-api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_air_quality=true`
        );
        const data = await response.json();
        setAirQuality(data.current_air_quality);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirQuality();
  }, [latitude, longitude]);

  if (loading)
    return <ActivityIndicator size="large" style={styles.loader} />;
  if (!airQuality)
    return <Text style={styles.error}>No air quality data available</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>PM10: {airQuality.pm10} μg/m³</Text>
      <Text style={styles.text}>PM2.5: {airQuality.pm2_5} μg/m³</Text>
      <Text style={styles.text}>Ozone: {airQuality.ozone} μg/m³</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    margin: 16,
    color: 'red',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default AirQuality;
