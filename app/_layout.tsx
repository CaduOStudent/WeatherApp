import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { use } from 'react';


export default function RootLayout() {
    
  return (
    <>
    <StatusBar style="dark" />
    
    <Stack>
      <Stack.Screen name="(tabs)" />
    </Stack>
    </>
  );
}
