import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';

import {
  EmptyState,
  SearchInput,
  Trending,
  Card,
  FilterInput,
} from '../../../components';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };

  const data = [
    {
      id: 1,
      title: 'Sample Video',
      thumbnail:
        'https://images.unsplash.com/photo-1712955685153-1b9c8edd071f?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      creator: {
        username: 'sampleUser',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
      },
    },
    {
      id: 2,
      title: 'Sample Video',
      thumbnail:
        'https://images.unsplash.com/photo-1712955685153-1b9c8edd071f?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      creator: {
        username: 'sampleUser',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
      },
    },
    {
      id: 3,
      title: 'Sample Video',
      thumbnail:
        'https://images.unsplash.com/photo-1712955685153-1b9c8edd071f?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      creator: {
        username: 'sampleUser',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',
      },
    },
  ];

  const trends = [
    {
      id: 1,
      thumbnail:
        'https://images.unsplash.com/photo-1712955685153-1b9c8edd071f?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      thumbnail:
        'https://images.unsplash.com/photo-1610772965521-f5ed4e493e64?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      thumbnail:
        'https://images.unsplash.com/photo-1619872752556-f0f148e6c724?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex px-4 space-y-2">
            <SearchInput />

            <FilterInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-500">
                Latest Vouchers
              </Text>

              <Trending posts={trends} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Voucher Found"
            subtitle="No voucher created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
