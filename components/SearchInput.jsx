import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { View, TouchableOpacity, TextInput, Alert } from 'react-native';


const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-gray-50 rounded-2xl border-2 border-gray-500 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search a voucher"
        placeholderTextColor="#CDCDE0"
        onChangeText={e => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === '')
            return Alert.alert(
              'Missing Query',
              'Please input something to search results across database',
            );

          if (pathname.startsWith('/search')) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <FontAwesome name="search" size={20} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
