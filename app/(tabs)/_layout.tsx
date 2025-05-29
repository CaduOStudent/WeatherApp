import { Tabs } from 'expo-router';
import { UnitSettingsProvider } from '../../utils/UnitSettingsContext'; // adjust path as needed


export default function TabLayout() {
  return (
    <UnitSettingsProvider>

    <Tabs>
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="settings" />
      <Tabs.Screen name = "search"/>
    </Tabs>

    </UnitSettingsProvider>
  );
}
