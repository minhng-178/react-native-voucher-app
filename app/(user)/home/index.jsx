import { useState } from 'react';
import { useQuery } from 'react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatList, Image, RefreshControl, Text, View } from 'react-native';

import {
  EmptyState,
  SearchInput,
  Trending,
  Card,
  FilterInput,
  Loader,
} from '../../../components';
import { getQRsCustomer } from '../../../api/qr';
import { dataSample } from '../../../assets/data';

const HomeScreen = () => {
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['qrsCustomer'],
  //   queryFn: getQRsCustomer,
  // });

  // if (error) {
  //   return (
  //     <EmptyState title="No Voucher Found" subtitle="No voucher created yet" />
  //   );
  // }

  // if (isLoading) {
  //   <Loader isLoading={isLoading} />;
  // }

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    // setRefreshing(true);
    setRefreshing(false);
  };

  const trends = [
    {
      id: 1,
      thumbnail:
        'https://cf.shopee.vn/file/5f7e2629cdea52388e6e90330b0e9972_tn',
    },
    {
      id: 2,
      thumbnail:
        'https://cf.shopee.vn/file/5f7e2629cdea52388e6e90330b0e9972_tn',
    },
    {
      id: 3,
      thumbnail:
        'https://cf.shopee.vn/file/5f7e2629cdea52388e6e90330b0e9972_tn',
    },
  ];

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={dataSample}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            price={item.price}
            buyed={item.buyed}
            creator={item.host.username}
            avatar={item.host.avatar}
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

              <Trending posts={trends} />
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
