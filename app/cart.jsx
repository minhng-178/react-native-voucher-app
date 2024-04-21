import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, FlatList, Image } from 'react-native';

import { CustomButton } from '../components';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';

const Cart = () => {
  const { items, total } = useCart();

  return (
    <View className="flex-1 px-2">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListEmptyComponent={() => (
          <Image
            className="w-full aspect-square"
            source={{
              uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp',
            }}
          />
        )}
        contentContainerStyle={{ gap: 10, paddingTop: 10 }}
      />
      <Text className="font-psemibold text-lg mb-2">Total: ${total}</Text>
      <CustomButton
        title="Checkout"
        onPress={() => console.log('checkout')}
        containerStyles="mt-auto"
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;
