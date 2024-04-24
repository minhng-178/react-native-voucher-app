import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useToast } from 'react-native-toast-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import { icons } from '../../../constants';
import { uploadImage } from '../../../api/upload';
import { createQR, getQR } from '../../../api/qr';
import { products } from '../../../assets/products';
import { CustomButton, FormField } from '../../../components';

const Create = () => {
  const { id } = useLocalSearchParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ['qr', id],
    queryFn: () => getQR(id),
  });

  const toast = useToast()
  const [uploading, setUploading] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: null,
    amount: '',
    expiredDate: new Date(),
    discounts: {
      discount: '',
      currency: '',
      min_price: '',
    },
    details: {
      detail: '',
      step: '',
    },
  });

  const isUpdating = !!id;

  const updatingProduct = product?.data || {};

  console.log(updatingProduct);

  useEffect(() => {
    if (updatingProduct) {
      setForm({
        title: updatingProduct.name,
        // price: updatingProduct.price.toString(),
        // image: updatingProduct.image,
        // expiredDate: new Date(updatingProduct.expiredDate),
      });
    }
  }, [updatingProduct]);

  const onChange = selectedDate => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (currentDate <= today) {
      return Alert.alert('Expiration date must be in the future');
    }

    setShow(false);
    setForm({ ...form, expiredDate: currentDate });
  };

  const showMode = modeToShow => {
    setShow(true);
    setMode(modeToShow);
  };

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];

      const imageFile = await uploadImage(file);

      setForm({
        ...form,
        image: imageFile.image_url,
      });
    } else {
      setTimeout(() => {
        Alert.alert('Image picked', JSON.stringify(result));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.name === '') |
      (form.price === '') |
      !form.image |
      (form.amount === '') |
      (form.discounts.discount === '') |
      (form.discounts.currency === '') |
      (form.discounts.min_price === '') |
      (form.details.detail === '') |
      (form.details.step === '')
    ) {
      return Alert.alert('Please provide all fields');
    }

    setUploading(true);
    try {
      await createQR(form);
      toast.show('Create new voucher successful!', { type: 'success' })

      router.push('/(host)/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        name: '',
        image: null,
        expiredDate: new Date(),
        price: '',
        discounts: {
          discount: '',
          currency: '',
          min_price: '',
        },
        details: {
          detail: '',
          step: '',
        },
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <Stack.Screen
        options={{ title: isUpdating ? 'Update Voucher' : 'Create Voucher' }}
      />

      <ScrollView className="px-4 space-y-2">
        <Text className="text-2xl text-black font-psemibold">
          {isUpdating ? 'Update Voucher' : 'Create voucher'}
        </Text>

        <FormField
          title="Voucher Title"
          value={form.name}
          placeholder="Give your Voucher a catchy name..."
          handleChangeText={e => setForm({ ...form, name: e })}
          otherStyles="mt-5"
        />

        <FormField
          title="Price"
          value={form.price}
          handleChangeText={e => setForm({ ...form, price: e })}
          keyboardType="numeric"
          otherStyles="mt-5"
        />

        <FormField
          title="Amount"
          value={form.amount}
          handleChangeText={e => setForm({ ...form, amount: e })}
          keyboardType="numeric"
          otherStyles="mt-5"
        />

        <FormField
          title="Discount"
          value={form.discounts.discount}
          handleChangeText={e =>
            setForm({
              ...form,
              discounts: { ...form.discounts, discount: e },
            })
          }
          keyboardType="numeric"
          otherStyles="mt-5"
        />

        <FormField
          title="Currency"
          value={form.discounts.currency}
          placeholder={'VND'}
          handleChangeText={e =>
            setForm({ ...form, discounts: { ...form.discounts, currency: e } })
          }
          otherStyles="mt-5"
        />

        <FormField
          title="Min price"
          value={form.discounts.min_price}
          handleChangeText={e =>
            setForm({
              ...form,
              discounts: { ...form.discounts, min_price: e },
            })
          }
          keyboardType="numeric"
          otherStyles="mt-5"
        />

        <FormField
          title="Detail"
          value={form.details.detail}
          handleChangeText={e =>
            setForm({ ...form, details: { ...form.details, detail: e } })
          }
          otherStyles="mt-5"
        />

        <FormField
          title="Step"
          value={form.details.step}
          handleChangeText={e =>
            setForm({ ...form, details: { ...form.details, step: e } })
          }
          keyboardType="numeric"
          otherStyles="mt-5"
        />

        <View className="space-y-2">
          <Text className="text-base text-gray-500 font-pmedium mt-5">
            Pick expires date
          </Text>
          <Button
            title="Select Date"
            onPress={() => showMode('date')}
            color={'#FF9C01'}
          />
          {show && (
            <DateTimePicker
              value={form.expiredDate}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <Text className="text-base text-gray-500 font-pmedium mt-3">
            Expiration date: {form.expiredDate.toLocaleDateString()}
          </Text>
        </View>

        <View className="space-y-2">
          <Text className="text-base text-gray-500 font-pmedium mt-5">
            Upload Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.image ? (
              <Image
                source={{ uri: form.image }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-white rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center ">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Submit "
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
