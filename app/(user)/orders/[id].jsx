import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, View } from 'react-native';

import { orders } from '../../../assets/orders';
import { OrderItemListItem, OrderListItem } from '../../../components';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();

  const order = orders.find(order => order.id === Number(id));

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
}
