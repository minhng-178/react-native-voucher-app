import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatList, RefreshControl, Text, View } from 'react-native';

import {
  EmptyState,
  SearchInput,
  Trending,
  Card,
  FilterInput,
  Loader,
} from '../../../components';

import { getQRs } from '../../../api/qr';

const HomeScreen = () => {
  const { data: products, error, refetch } = useQuery({
    queryKey: ['qrs'],
    queryFn: getQRs,
  });

  if (error) {
    return (
      <EmptyState title="No Voucher Found" subtitle="No voucher created yet" />
    );
  }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filterProduct = products?.data ? products.data.filter(product => product.status === 1) : [];

  const latestProduct = filterProduct.slice(0, 3);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={filterProduct}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Card
            id={item._id}
            name={item.name}
            image={item.image_url}
            price={item.price}
            amount={item.amount}
            expiredDate={item.expire_date}
            hostName={item.host_id ? item.host_id.fullName : 'Unknown'}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-2 px-2 space-y-2">
            <SearchInput />

            <FilterInput />

            <View className="w-full flex-1 pt-5 pb-4">
              <Text className="text-lg font-pregular text-gray-500">
                Latest Vouchers
              </Text>

              <Trending posts={latestProduct} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Voucher Found"
            subtitle="No voucher created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
