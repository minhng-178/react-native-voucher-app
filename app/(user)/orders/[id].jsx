import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

import { OrderItemListItem, OrderListItem } from '../../../components';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../../../api/order';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { data } = useQuery({
    queryKey: ['orderid'],
    queryFn: () => getOrder(id),
  });

  const order = data?.data;

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={data?.data} />}
        ListFooterComponent={() => (
          <Text className="font-pextrabold">
            Total: {order?.total_price} VND
          </Text>
        )}
      />
    </View>
  );
}
