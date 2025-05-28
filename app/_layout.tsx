import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { use } from 'react';
import { UnitSettingsProvider } from '../utils/UnitSettingsContext';



export default function RootLayout() {
    
  return (
    <>
    <StatusBar style="dark" />
    <UnitSettingsProvider>

    <Stack>
      <Stack.Screen name="(tabs)" />
    </Stack>
    </UnitSettingsProvider>
    </>
  );
}
