import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { getOrdersCustomer } from '../../../api/order';
import { EmptyState, OrderListItem } from '../../../components';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../../providers/AuthProvider';

const OrdersScreen = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState('all');
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrdersCustomer(user._id),
  });

  const sortedOrders = orders?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredProducts = sortedOrders?.filter(product => {
    if (status === 'all') return true;
    if (status === 'pending' && product.status === 0) return true;
    if (status === 'cancel' && product.status === 1) return true;
    if (status === 'success' && product.status === 2) return true;
    return false;
  });

  return (
    <View className="flex-1">
      <FlatList
        data={filteredProducts}
        renderItem={({ item, index }) => (
          <OrderListItem order={item} index={index} />
        )}
        ListHeaderComponent={() => {
          return (
            filteredProducts?.length > 0 && (
              <View>
                <Text className="font-psemibold px-2 text-secondary-100">
                  Total orders: {filteredProducts?.length}
                </Text>

                <Picker
                  selectedValue={status}
                  onValueChange={itemValue => setStatus(itemValue)}
                >
                  <Picker.Item label="See All" value="all" />
                  <Picker.Item label="Pending" value="pending" />
                  <Picker.Item label="Cancel" value="cancel" />
                  <Picker.Item label="Success" value="success" />
                </Picker>
              </View>
            )
          );
        }}
        ListEmptyComponent={() => <EmptyState title={'No orders yet'} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default OrdersScreen;
