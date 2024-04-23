import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Image, Pressable } from 'react-native';

import { images } from '../constants';
import { useCart } from '../providers/CartProvider';

const CartListItem = ({ cartItem }) => {
  const { updateQuantity } = useCart();
  if (!cartItem) {
    return <Text>No cart found!</Text>;
  }

  return (
    <View className="bg-white rounded-lg p-1 flex-row items-center">
      <Image
        source={{ uri: cartItem.product.thumbnail }}
        className="w-16 aspect-square self-center mr-2 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-medium text-lg mb-1" numberOfLines={1}>
          {cartItem.product.title}
        </Text>
        <View className="flex-row gap-1">
          <Text className="text-red-500 font-bold">
            {cartItem.product.price}đ
          </Text>
        </View>
      </View>
      <View className="flex-row gap-4 items-center mx-2">
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          size={16}
          color="gray"
        />

        <Text className="font-medium text-lg">{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          size={16}
          color="gray"
        />
      </View>
    </View>
  );
};

export default CartListItem;
