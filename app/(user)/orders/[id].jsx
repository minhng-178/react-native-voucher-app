import { Stack, router, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { getOrder } from '../../../api/order';
import { usePaymentUrl } from '../../../providers/PaymentProvider';
import { CustomButton, OrderItemListItem, OrderListItem } from '../../../components';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { handleCheckout } = usePaymentUrl()

  const { data } = useQuery({
    queryKey: ['orderid'],
    queryFn: () => getOrder(id),
  });

  const order = data?.data;

  const handlePressCheckout = async () => {
    await handleCheckout(order)
  }
  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={[order]}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <Text className="font-pextrabold">
            Total: {order?.total_price} VND
          </Text>
        )}
      />


      {order?.status === 1 && <CustomButton handlePress={handlePressCheckout} title={'Checkout'} />}
    </View>
  );
}
