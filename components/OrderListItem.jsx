import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import { View, Text, Pressable } from 'react-native';

dayjs.extend(relativeTime);

const OrderListItem = ({ order, index }) => {
  const segments = useSegments();

  let statusText = '';
  let statusColor = '';

  if (order?.status === 1) {
    statusText = 'Pending';
    statusColor = 'orange';
  } else if (order?.status === 2) {
    statusText = 'Success';
    statusColor = 'green';
  } else if (order?.status === 0) {
    statusText = 'Cancel';
    statusColor = 'red';
  } else {
    (statusText = ''), (statusColor = '#000');
  }

  return (
    <Link href={`/${segments[0]}/orders/${order?._id}`} asChild>
      <Pressable className="bg-primary flex-row justify-between rounded-md p-2">
        <View>
          <Text className="font-psemibold mb-1">Order #{order?._id}</Text>
          <Text className="text-gray-500">
            {dayjs(order?.createdAt).fromNow()}
          </Text>
        </View>

        <Text style={{ color: statusColor }}>{statusText}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;
