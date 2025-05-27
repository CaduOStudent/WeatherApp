// components/LocationPermission.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface LocationPermissionProps {
  onLocationObtained: (latitude: number, longitude: number) => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onLocationObtained }) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    try {
      // Select the permission key based on the platform
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        setPermissionGranted(true);
        getCurrentLocation();
      } else {
        setLocationError('Location permission not granted');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationError('Error requesting location permission');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationObtained(latitude, longitude);
      },
      (error) => {
        console.error('Error getting current position:', error);
        setLocationError(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {permissionGranted ? (
        <Text>Permission granted, retrieving location...</Text>
      ) : (
        <Button title="Allow Location Permission" onPress={requestLocationPermission} />
      )}
      {locationError && <Text style={styles.error}>{locationError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  error: { color: 'red', marginTop: 10 },
});

export default LocationPermission;
