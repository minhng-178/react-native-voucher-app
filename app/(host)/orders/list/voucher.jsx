import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Picker } from '@react-native-picker/picker';
import { View, FlatList } from 'react-native';

import { getQRs } from '../../../../api/qr';
import { Card, EmptyState } from '../../../../components';

const VoucherScreen = () => {
  const [status, setStatus] = useState('all');
  const { data: products, error } = useQuery({
    queryKey: ['qrs'],
    queryFn: getQRs,
  });

  if (error) {
    return (
      <EmptyState title="No Voucher Found" subtitle="No voucher created yet" />
    );
  }

  const filteredProducts = products?.data.filter((product) => {
    if (status === 'all') return true;
    if (status === 'review' && product.status === 0) return true;
    if (status === 'publish' && product.status === 1) return true;
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
            image={item.image}
            price={item.price}
            amount={item.amount}
            expiredDate={item.expire_date}
          />
        )}
        ListHeaderComponent={() => (
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="See All" value="all" />
            <Picker.Item label="Review" value="review" />
            <Picker.Item label="Publish" value="publish" />
          </Picker>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Voucher Found"
            subtitle="No voucher created yet"
          />
        )}
      />
    </View>
  );
};

export default VoucherScreen;
