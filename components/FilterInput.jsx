import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { router, usePathname } from 'expo-router';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { cn } from '../libs/utils';
import { getCates } from '../api/cateQR';

const FilterInput = () => {
  const { data } = useQuery({
    queryKey: ['cates'],
    queryFn: getCates,
  });

  const pathname = usePathname();
  const [activeCate, setActiveCate] = useState('');

  return (
    <View className="m-2">
      <FlatList
        data={data?.data}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={cn(
              'bg-light-background py-1 px-3 rounded-full border',
              activeCate === item && 'border-secondary',
            )}
            onPress={() => {
              // if (activeCate === item) {
              //   setActiveCate('');
              // } else {
              //   setActiveCate(item);
              // }
              router.push(`/search/${item.name}`);
            }}
          >
            <Text
              className={cn(
                'text-black',
                activeCate === item && 'text-secondary-200',
              )}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        contentContainerStyle={{ columnGap: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FilterInput;
