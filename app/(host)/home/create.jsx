import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
  Platform,
  Button,
} from 'react-native';

import { icons } from '../../../constants';
import { CustomButton, FormField } from '../../../components';
import { products } from '../../../assets/products';

const Create = () => {
  const { id } = useLocalSearchParams();
  const [uploading, setUploading] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const [form, setForm] = useState({
    title: '',
    price: '',
    thumbnail: null,
    expiredDate: new Date(),
  });

  const isUpdating = !!id;

  const updatingProduct = products.find(product => product.id === Number(id));

  useEffect(() => {
    if (updatingProduct) {
      setForm({
        title: updatingProduct.title,
        price: updatingProduct.price.toString(),
        thumbnail: updatingProduct.thumbnail,
        expiredDate: new Date(updatingProduct.expiredDate),
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
      setForm({
        ...form,
        thumbnail: result.assets[0],
      });
    } else {
      setTimeout(() => {
        Alert.alert('Image picked', JSON.stringify(result));
      }, 100);
    }
  };

  const submit = async () => {
    if ((form.price === '') | (form.title === '') | !form.thumbnail) {
      return Alert.alert('Please provide all fields');
    }

    setUploading(true);
    try {
      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        thumbnail: null,
        price: 0,
      });
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
          value={form.title}
          placeholder="Give your Voucher a catchy title..."
          handleChangeText={e => setForm({ ...form, title: e })}
          otherStyles="mt-5"
        />

        <FormField
          title="Price"
          value={form.price}
          handleChangeText={e => setForm({ ...form, price: Number(e) })}
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
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail }}
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
