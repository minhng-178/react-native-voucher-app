import { useState } from 'react';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { cn } from "../libs/utils"

const FilterInput = () => {
  const [activeBrand, setActiveBrand] = useState('');

  const data = ['Apple', 'Samsung', 'Oppo', 'Xiaomi', 'Huawei', 'LG'];

  return (
    <View className="m-2">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={cn('bg-light-background py-1 px-3 rounded-full border', activeBrand === item && 'border-secondary')}
            onPress={() => {
              if (activeBrand === item) {
                setActiveBrand('');
              } else {
                setActiveBrand(item);
              }
            }}
          >
            <Text className={cn('text-black', activeBrand === item && 'text-secondary-200')}>{item}</Text>
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
