import { useState } from 'react';
import { Link, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Alert, Image } from 'react-native';

import { login } from '../../api/auth';
import { images } from '../../constants';
import { useAuth } from '../../providers/AuthProvider';
import { CustomButton, FormField } from '../../components';

const SignInScreen = () => {
  const { updateAuth, isCustomer, isHost } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  if (isCustomer) return <Redirect href="/(user)/home" />;

  if (isHost) return <Redirect href="/(host)/home" />;

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);

    try {
      const [user, tokens] = await login(form.email, form.password);

      if (!user && !tokens) {
        Alert.alert('Login falied!');
      }

      updateAuth(user, tokens);
    } catch (error) {
      Alert.alert('Error', error.message);
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
            Log in
          </Text>

          <FormField
            title="Email"
            value={form.email}
            placeholder={'example@gmail.com'}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-500 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
