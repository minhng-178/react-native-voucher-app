import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, FlatList, Image, Alert } from 'react-native';

import { CustomButton } from '../components';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import { router } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { createOrder } from '../api/order';
import { useState } from 'react';

const Cart = () => {
  const { items, total } = useCart();
  const [uploading, setUploading] = useState(false);

  const { user } = useAuth();

  const [form, setForm] = useState({
    name_recieve: user.fullName,
    note: '',
    email_recieve: user.email,
    qrs: items.map(item => ({
      qr_id: item.product._id,
      amount: item.quantity,
    })),
  });

  console.log('====================================');
  console.log(user);
  console.log('====================================');

  const handleSubmitOrder = async () => {
    try {
      if (
        form.name_recieve === '' ||
        form.email_recieve === '' ||
        form.qrs.some(qr => qr.qr_id === '' || qr.amount === '')
      ) {
        return Alert.alert('Error', 'Please fill in all fields');
      }
      setUploading(true);
      console.log('Dữ liệu gửi đi:', form);

      await createOrder(form, user._id);
      toast.show('Order created successfully!', { type: 'success' });
      router.push('/(user))/orders');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        name_recieve: form.name_recieve || '',
        note: '',
        email_recieve: form.email_recieve || '',
        qrs: form.qrs || [
          {
            qr_id: '',
            amount: '',
          },
        ],
      });
    }
    setUploading(false);
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
      <Text className="font-psemibold text-lg mb-2">Total: ${total}</Text>
      <CustomButton
        title="Order"
        handlePress={handleSubmitOrder}
        containerStyles="mt-auto mb-6"
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default Cart;
