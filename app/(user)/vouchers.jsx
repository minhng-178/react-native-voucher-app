import { View, Text, Alert, FlatList, Image } from 'react-native';
import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getQRsCode } from '../../api/qrcode';

const VouchersScreen = () => {
  const { user } = useAuth();

  if (!user) {
    Alert.alert('Please logged in to access actions');
    return null;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['qrCodes'],
    queryFn: () => getQRsCode(user._id),
  });

  console.log(data?.data);

  const product = data?.data;

  return (
    <View>
      <FlatList
        data={product}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.img }}
          />
        )}
      />
    </View>
  );
};

export default VouchersScreen;
