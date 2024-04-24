import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, Image, Platform } from 'react-native';

import { images } from '../constants';
import { useAuth } from '../providers/AuthProvider';
import CustomButton from '../components/CustomButton';

const WelcomeScreen = () => {
  const { isLogged } = useAuth();

  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  if (firstLaunch === null) {
    return null;
  } else if (firstLaunch === true) {
    // if (isLogged) return <Redirect href="/(user)/home" />;

    return (
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            height: '100%',
          }}
        >
          <View className="w-full flex justify-center items-center h-full px-4">
            <Image
              source={images.logo}
              className="w-[180px] h-[84px]"
              resizeMode="contain"
            />

            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-2xl text-black font-bold text-center">
                Discover Endless{'\n'}
                Possibilities with{' '}
                <Text className="text-secondary-200">E-Voucher</Text>
              </Text>

              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-3 -right-6"
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm font-pregular text-gray-700 mt-7 text-center">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with E-Voucher
            </Text>

            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push('sign-in')}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </SafeAreaView>
    );
  } else {
    return <Redirect href="/(user)/home" />;
  }
};

export default WelcomeScreen;
