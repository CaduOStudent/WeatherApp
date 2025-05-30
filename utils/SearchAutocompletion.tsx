import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export type Place = {
  id?: string;
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
};

type Props = {
  onPlaceSelect: (place: Place) => void;
  onMicPress: (setQuery: (q: string) => void) => void;
};

export default function SearchAutocomplete({ onPlaceSelect, onMicPress }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fetchSuggestions = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(text)}&count=5&language=en&format=json`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  // Hide suggestions when keyboard is dismissed
  React.useEffect(() => {
    const hide = Keyboard.addListener('keyboardDidHide', () => setIsFocused(false));
    return () => hide.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TouchableOpacity onPress={() => fetchSuggestions(query)}>
          <Ionicons name="search-outline" size={25} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          placeholderTextColor="#CCC"
          value={query}
          onChangeText={fetchSuggestions}
          selectTextOnFocus={false}
          returnKeyType="search"
          onSubmitEditing={() => fetchSuggestions(query)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity onPress={() => onMicPress(setQuery)}>
          <Ionicons name="mic-outline" size={25} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator style={styles.loader} />}
      {isFocused && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={item => item.id || `${item.latitude},${item.longitude}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.placeItem} onPress={() => onPlaceSelect(item)}>
              <Text style={styles.placeText}>
                {item.name}, {item.country} ({item.latitude}, {item.longitude})
              </Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    margin: 0,
    width: '100%'
   },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(93, 92, 92, 0.75)',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '90%'
  },
  input: {
    flex: 1,
    color: '#222',
    fontSize: 16,
    padding: 10,
    backgroundColor: 'transparent',
  },
  icon: {
    padding: 6,
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