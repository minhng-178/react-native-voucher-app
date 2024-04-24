import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, FlatList, Image, Alert } from 'react-native';

import { CustomButton } from '../components';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import { router } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { createOrder } from '../api/order';
import { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

const Cart = () => {
  const toast = useToast();
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const [uploading, setUploading] = useState(false);

  if (!user) {
    Alert.alert('Please logged in  to access this page');
    router.push('/sign-in');
    return;
  }

  const dataOrder = {
    name_recieve: user.fullName,
    note: '',
    email_recieve: user.email,
    qrs: items.map(item => ({
      qr_id: item.product._id,
      amount: item.quantity,
    })),
  };

  const handleSubmitOrder = async () => {
    if (
      dataOrder.name_recieve === '' ||
      dataOrder.email_recieve === '' ||
      dataOrder.qrs.some(qr => qr.qr_id === '' || qr.amount === '')
    ) {
      return Alert.alert('Error', 'Please fill in all fields');
    }
    setUploading(true);
    try {
      const responseOrder = await createOrder(dataOrder);
      if (responseOrder) {
        toast.show('Order created successfully!', { type: 'success' });
        clearCart();
        router.push('/(user)/orders');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUploading(false);
    }
  };

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
      <Text className="font-psemibold text-lg mb-2">Total: {total} VND</Text>
      <CustomButton
        title="Order"
        handlePress={handleSubmitOrder}
        containerStyles="mt-auto mb-6"
        isLoading={uploading}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;
