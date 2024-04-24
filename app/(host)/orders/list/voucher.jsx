import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Picker } from '@react-native-picker/picker';
import { View, FlatList, RefreshControl } from 'react-native';

import { getHostQrs } from '../../../../api/qr';
import { Card, EmptyState, Loader } from '../../../../components';

const VoucherScreen = () => {
  const [status, setStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['qrs'],
    queryFn: getHostQrs,
  });

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (error || !products || !products.results) {
    return (
      <EmptyState title="No Voucher Found" subtitle="No voucher created yet" />
    );
  }
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredProducts = products?.results?.filter(product => {
    if (status === 'all') return true;
    if (status === 'cancel' && product.status === 0) return true;
    if (status === 'review' && product.status === 1) return true;
    if (status === 'publish' && product.status === 2) return true;
    return false;
  });

  return (
    <View className="bg-primary flex-1">
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Card
            id={item._id}
            name={item.name}
            image={item.image_url}
            price={item.price}
            amount={item.amount}
            expiredDate={item.expire_date}
          />
        )}
        ListHeaderComponent={() =>
          filteredProducts.length > 0 && (
            <View >
              <Text className="font-psemibold px-2 text-secondary-100">
                Total vouchers: {filteredProducts?.length}
              </Text>

              <Picker
                selectedValue={status}
                onValueChange={itemValue => setStatus(itemValue)}
              >
                <Picker.Item label="See All" value="all" />
                <Picker.Item label="Cancel" value="cancel" />
                <Picker.Item label="Review" value="review" />
                <Picker.Item label="Publish" value="publish" />
              </Picker>
            </View>
          )
        }
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
    </View>
  );
};

export default VoucherScreen;
