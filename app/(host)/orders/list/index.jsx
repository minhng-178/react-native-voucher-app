import { FlatList } from 'react-native';
import { orders } from '../../../../assets/orders';
import { EmptyState, OrderListItem } from '../../../../components';
import { useSegments } from 'expo-router';

const OrdersScreen = () => {
  const segments = useSegments();

  console.log(segments);

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      ListEmptyComponent={() => <EmptyState title={'No orders yet'} />}
    />
  );
};

export default OrdersScreen;
