import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';

import { EmptyState, InfoBox, Card } from '../../components';

const ProfileScreen = () => {
  const user = {
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
    username: 'John Doe',
  };

  return (
    <View className="bg-primary">
      <FlatList
        data={[]}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Voucher Found"
            subtitle="No voucher found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-2 mb-12 px-4">
            <TouchableOpacity
              onPress={() => {}}
              className="flex w-full items-end mb-10"
            >
              <FontAwesome name="sign-out" size={24} color="#FF8E01" />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg text-black"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ProfileScreen;
