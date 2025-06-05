import Ionicons from '@expo/vector-icons/Ionicons';
import '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import React from 'react';
import { UnitSettingsProvider } from '../../utils/UnitSettingsContext';


// This component defines the main tab navigation layout for the app.
// It hides the header and customizes the tab bar appearance and icons.
export default function RootLayout() {
  return (
    <UnitSettingsProvider>

      <Tabs
        // Configure the tab bar appearance and behavior
        screenOptions={{
          headerShown: false, // Hide the header for all tabs
          tabBarShowLabel: false, // Hide text labels under icons
          tabBarStyle: {
            backgroundColor: 'rgba(93, 92, 92, 0.75)', // Custom background color
            borderTopWidth: 0, // Remove top border
            height: 65, // Set tab bar height
            paddingTop: 10 // Add padding at the top
          },
        }}
      >
        {/* Tab for the Search page (right icon) */}
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="map-outline"
                size={28}
                color={focused ? '#fff' : '#aaa'} // White when focused, gray otherwise
                style={{ transform: [{ scale: focused ? 1.2 : 1 }] }} // Scale up icon when focused
              />
            ),
          }}
        />
        {/* Tab for the Home page (center icon) */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="paper-plane-outline"
                size={28}
                color={focused ? '#fff' : '#aaa'}
                style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}
              />
            ),
          }}
        />
        {/* Tab for the Settings page (left icon) */}
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings-outline"
                size={28}
                color={focused ? '#fff' : '#aaa'}
                style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}
              />
            ),
          }}
        />
      </Tabs>
    </UnitSettingsProvider>
  );
}