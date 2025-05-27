// components/SearchAutocomplete.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
}

interface SearchAutocompleteProps {
  onPlaceSelect: (place: Place) => void;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Fetch search suggestions from the geocoding API
  const fetchPlaces = async (text: string) => {
    if (!text.trim()) {
      setPlaces([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          text
        )}&count=4&language=en&format=json`
      );
      const data = await response.json();
      if (data.results) {
        // Map the API result to our Place interface.
        // Some responses may not include an ID, so we generate one.
        const mappedPlaces: Place[] = data.results.map((item: any, index: number) => ({
          id: item.id ? item.id.toString() : `${item.name}-${index}`,
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          country: item.country,
        }));
        setPlaces(mappedPlaces);
      } else {
        setPlaces([]);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      setPlaces([]);
    }
    setLoading(false);
  };

  // Update the query and debounce the API call.
  const handleChangeText = (text: string) => {
    setQuery(text);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const timeout = setTimeout(() => {
      fetchPlaces(text);
    }, 300);
    setDebounceTimer(timeout);
  };

  // Render each search result as a pressable item.
  const renderPlaceItem = ({ item }: { item: Place }) => (
    <Pressable
      style={styles.placeItem}
      onPress={() => {
        onPlaceSelect(item);
        // Optionally clear the suggestions after selection.
        setQuery(item.name);
        setPlaces([]);
      }}>
      <Text style={styles.placeText}>
        {item.name}
        {item.country ? `, ${item.country}` : ''}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a place..."
        value={query}
        onChangeText={handleChangeText}
      />
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaceItem}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
  },
  loader: {
    marginVertical: 8,
  },
  placeItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  placeText: {
    fontSize: 16,
  },
});

export default SearchAutocomplete;
