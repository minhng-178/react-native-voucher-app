import { Image, Text, View } from 'react-native';
import React from 'react';
import { CustomButton } from '../../components';
import { router } from 'expo-router';

const SuccessScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-primary px-2">
      <Image
        className="w-full h-80"
        source={{
          uri: 'https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif',
        }}
        resizeMode="contain"
      />
      <Text className="mb-40 font-psemibold">Payment Success!</Text>

      <CustomButton
        handlePress={() => {
          router.push('/');
        }}
        title={'Go Back'}
        containerStyles={'w-full'}
      />
    </View>
  );
};

export default SuccessScreen;
