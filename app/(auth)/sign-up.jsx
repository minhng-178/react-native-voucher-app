import { useState } from 'react';
import { Link, router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { SafeAreaView } from 'react-native-safe-area-context';

import { View, Text, ScrollView, Dimensions, Alert, Image } from 'react-native';

import { images } from '../../constants';
import { register } from '../../api/auth';
import { CustomButton, FormField } from '../../components';

const SignUpScreen = () => {
  const toast = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const submit = async () => {
    if (form.name === '' || form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    if (!form.email.includes('@')) {
      Alert.alert('Error', 'Email must be valid');
    }

    if (form.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
    }

    setSubmitting(true);
    try {
      const [user] = await register(form.name, form.email, form.password);
      if (!user) {
        Alert.alert('Error', 'Sign up failed!');
      }

      toast.show('Account created successfully! Please log in.', {
        type: 'success',
      });

      router.replace('/sign-in');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[150px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-black mt-10 font-psemibold">
            Sign Up
          </Text>

          <FormField
            title="Name"
            value={form.name}
            handleChangeText={e => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            placeholder={'example@gmail.com'}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-500 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
