import React from 'react';
import { View, Text, Image } from 'react-native';
import { getQR } from '../api/qr';
import { useQuery } from '@tanstack/react-query';

const OrderItemListItem = ({ item }) => {

  const { data, isLoading } = useQuery({
    queryKey: ['qr'],
    queryFn: () => getQR(item.qr_id),
  });

  const product = data?.data

  return (
    <View className="flex-1 flex-row items-center bg-primary rounded-md">
      <Image
        source={{ uri: product?.image_url }}
        className="w-16 aspect-square self-center rounded-lg mr-2"
        resizeMode="cover"
      />

      <View className="flex-1">
        <Text className="font-psemibold text-md mb-2">
          {product?.name}
        </Text>
        <View className="flex-row gap-3">
          <Text className="font-pbold text-secondary-200">
            {product?.price}VND
          </Text>
          <Text className="font-pregular">
            Expires on:{' '}
            {new Date(product?.expire_date).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <Text className="font-pmedium p-2">{item?.amount}</Text>
    </View>
  );
};

export default OrderItemListItem;
