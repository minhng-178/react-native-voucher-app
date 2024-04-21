import React from 'react';
import { View, Text, Image } from 'react-native';

const OrderItemListItem = ({ item }) => {
  return (
    <View className="flex-1 flex-row items-center bg-primary rounded-md">
      <Image
        source={{ uri: item.products.thumbnail }}
        className="w-16 aspect-square self-center rounded-lg mr-2"
        resizeMode="cover"
      />

      <View className="flex-1">
        <Text className="font-psemibold text-md mb-2">
          {item.products.title}
        </Text>
        <View className="flex-row gap-3">
          <Text className="font-pbold text-secondary-200">
            ${item.products.price}
          </Text>
          <Text className="font-pregular">
            Expires on:{' '}
            {new Date(item.products.expiredDate).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <Text className="font-pmedium p-2">{item.quantity}</Text>
    </View>
  );
};

export default OrderItemListItem;
