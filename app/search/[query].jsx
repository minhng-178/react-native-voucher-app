import { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';

import { products } from '../../assets/products';
import { EmptyState, SearchInput, Card, FilterInput } from '../../components';

const Search = () => {
  const { query } = useLocalSearchParams();

  //   useEffect(() => {

  //   }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <Stack.Screen
        options={{
          title: 'Search',
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color={'#FFA001'}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            price={item.price}
            buyed={item.buyed}
            creator={item.host.username}
            avatar={item.host.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-500 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-black mt-1">
                {query}
              </Text>

              <View className="mt-6">
                <SearchInput initialQuery={query} />

                <FilterInput />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Voucher Found"
            subtitle="No voucher found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
