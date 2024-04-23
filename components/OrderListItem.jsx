import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import { View, Text, Pressable } from 'react-native';

dayjs.extend(relativeTime);

const OrderListItem = ({ order }) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable className="bg-primary flex-row justify-between rounded-md p-2">
        <View>
          <Text className="font-psemibold mb-1">Order #{order.id}</Text>
          <Text className="text-gray-500">
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>

        <Text>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;
