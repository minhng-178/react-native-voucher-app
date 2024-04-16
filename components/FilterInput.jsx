import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const FilterInput = () => {
  const [activeBrand, setActiveBrand] = useState('');

  const data = ['Apple', 'Samsung', 'Oppo', 'Xiaomi'];

  return (
    <View className="m-2">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="px-3 rounded-full border-black"
            onPress={() => {
              if (activeBrand === item) {
                setActiveBrand('');
              } else {
                setActiveBrand(item);
              }
            }}
          >
            <Text className="text-black">{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FilterInput;
