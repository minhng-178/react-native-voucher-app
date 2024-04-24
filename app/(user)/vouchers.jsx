import { View, Text, Alert, FlatList, Image } from 'react-native';
import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

import { getQRsCustomer } from '../../api/qr';

const VouchersScreen = () => {
  const { user } = useAuth();

  if (!user) {
    Alert.alert('Please logged in to access actions');
    return null;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['qrCodes'],
    queryFn: getQRsCustomer,
  });

  const product = data?.data;

  const filteredProduct = product?.filter(item => item.data.length > 0);

  const uniqueProduct = filteredProduct.filter(
    (v, i, a) => a.findIndex(t => t.name === v.name) === i,
  );

  return (
    <View>
      <FlatList
        data={uniqueProduct}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View>
            <Text className="p-2 font-semibold">{item.name}</Text>
            <FlatList
              data={item?.data}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View className="flex-1 items-center bg-primary rounded-md gap-2">
                  <Image
                    className="w-40 aspect-square self-center mr-2 rounded-lg"
                    source={{ uri: item?.img }}
                  />
                  <Text className="font-medium text-sm mb-1" numberOfLines={1}>
                    {item?.code}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#ccc',
                      marginVertical: 10,
                    }}
                  />
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default VouchersScreen;
