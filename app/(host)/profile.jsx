import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Image, FlatList, TouchableOpacity, Button } from 'react-native';

import { useAuth } from '../../providers/AuthProvider';
import { images } from '../../constants';
import { CustomButton, EmptyState, InfoBox } from '../../components';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const { user, logout, isLogged } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  const handleLogin = async () => {
    router.push('sign-in');
  };

  return (
    <View className="bg-primary h-full">
      <View className="w-full flex-1 justify-center items-center mt-2 mb-12 px-4">
        {isLogged && <TouchableOpacity
          onPress={handleLogout}
          className="flex w-full items-end mb-10"
        >
          <FontAwesome name="pencil" size={24} color="#FF8E01" />
        </TouchableOpacity>}

        <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
          <Image
            source={{
              uri: user?.avatar || images.defaultAvatar,
            }}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode="cover"
          />
        </View>

        <InfoBox
          title={user?.email || 'example@gmail.com'}
          containerStyles="mt-5"
          titleStyles="text-lg text-black"
        />

        <View className="mt-5 flex flex-row justify-between">
          <InfoBox
            title={0}
            subtitle="Point"
            titleStyles="text-xl text-black"
            containerStyles="mr-10"
          />

          <InfoBox
            title={0}
            subtitle="Feedbacks"
            titleStyles="text-xl text-black"
            containerStyles="mr-10"
          />

          <InfoBox
            title={0}
            subtitle="Orders"
            titleStyles="text-xl text-black"
          />
        </View>

        {isLogged ? (
          <CustomButton
            title="Logout"
            containerStyles={'w-full mt-8'}
            handlePress={handleLogout}
          />
        ) : (
          <CustomButton
            title="Login"
            containerStyles={'w-full mt-8'}
            handlePress={handleLogin}
          />
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
