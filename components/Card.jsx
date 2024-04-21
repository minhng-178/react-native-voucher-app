import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, useSegments } from 'expo-router';

const Card = ({ id, title, creator, thumbnail, price, total, review }) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/home/${id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {}}
        className="flex-row items-start mx-2 mb-6 bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100"
      >
        <Image
          source={{ uri: thumbnail }}
          className="flex-1 w-full h-full rounded-lg"
          resizeMode="cover"
        />

        <View className="flex-col w-52 justify-between leading-normal ml-3 my-3 gap-y-1 py-2">
          <Text className="font-plight text-gray-70">{creator}</Text>

          <Text
            className="font-psemibold text-sm text-black mb-2"
            numberOfLines={1}
          >
            {title}
          </Text>

          <View className="flex-row items-center mb-2">
            <FontAwesome size={16} name="star" color="tomato" />
            <Text className="text-xs text-gray-500 font-pregular ml-2">
              {review ?? '--'}
            </Text>

            <View
              style={{
                width: 1,
                height: '100%',
                backgroundColor: '#9B9B9B',
                marginHorizontal: 10,
              }}
            />

            <FontAwesome size={16} name="shopping-cart" color="#9B9B9B" />
            <Text className="text-xs text-gray-500 font-pregular ml-2">
              {total}
            </Text>
          </View>

          <Text className="text-sm font-pbold">{price}đ</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default Card;
