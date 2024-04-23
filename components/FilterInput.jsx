import { useState } from 'react';
import { router, usePathname } from 'expo-router';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { cn } from "../libs/utils"

const FilterInput = () => {
  const pathname = usePathname();
  const [activeCate, setActiveCate] = useState('');

  const data = ['Apple', 'Samsung', 'Oppo', 'Xiaomi', 'Huawei', 'LG'];

  return (
    <View className="m-2">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={cn('bg-light-background py-1 px-3 rounded-full border', activeCate === item && 'border-secondary')}
            onPress={() => {
              // if (activeCate === item) {
              //   setActiveCate('');
              // } else {
              //   setActiveCate(item);
              // }
              router.push(`/search/${item}`);
            }}
          >
            <Text className={cn('text-black', activeCate === item && 'text-secondary-200')}>{item}</Text>
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
