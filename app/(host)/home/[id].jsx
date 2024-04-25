import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { View, Text, Image, Pressable } from 'react-native';

import { Loader } from '../../../components';
import { images } from '../../../constants';
import { getHostQrs, getQR } from '../../../api/qr';
import { calculateTimeLeft } from '../../../utils/countdown';

const VoucherDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ['qr', id],
    queryFn: () => getQR(id),
  });

  const { data: products } = useQuery({
    queryKey: ['qrs'],
    queryFn: getHostQrs,
  });

  const productExists = products?.results?.some(p => p._id === product?.data?._id) ?? false;
  const statusProduct = product?.data?.status

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!isLoading && product) {
      setTimeLeft(calculateTimeLeft(product.data.expire_date));

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(product.data.expire_date));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [product, isLoading]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View className="bg-primary flex-1 p-2">
      {productExists && statusProduct === 1 && <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(host)/home/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={'#FFA001'}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />}

      <Stack.Screen options={{ title: product.data.name }} />
      <Image
        source={{ uri: product.data.image_url || images.defaultVoucher }}
        className="w-full aspect-[4/3] rounded-lg mb-2"
        resizeMode="cover"
      />
      <View className="bg-blue-100 h-14 flex-row px-2 items-center rounded-lg shadow-md overflow-hidden mb-2">
        <Text className="text-lg">Expires time on:</Text>
        <View className="flex-row ml-2">
          <View className="bg-black rounded-md p-2 mr-1">
            <Text className="text-white text-md font-bold">
              {timeLeft && timeLeft.days}
            </Text>
          </View>
          <Text className="text-xl font-bold">:</Text>
          <View className="bg-black rounded-md p-2 mx-1">
            <Text className="text-white text-md font-bold">
              {timeLeft && timeLeft.hours}
            </Text>
          </View>
          <Text className="text-xl font-bold">:</Text>
          <View className="bg-black rounded-md p-2 mx-1">
            <Text className="text-white text-md font-bold">
              {timeLeft && timeLeft.minutes}
            </Text>
          </View>
          <Text className="text-xl font-bold">:</Text>
          <View className="bg-black rounded-md p-2 ml-1">
            <Text className="text-white text-md font-bold">
              {timeLeft && timeLeft.seconds}
            </Text>
          </View>
        </View>
      </View>
      <Text className="font-pregular text-sm mb-2">{product?.data?.host_id?.fullName}</Text>
      <Text className="font-psemibold text-lg mb-2" numberOfLines={2}>
        {product.data.name}
      </Text>
      {product.data.discount.map((item, index) => (
        <Text key={index} className="font-pregular text-sm mb-2">
          Discount: {item.discount}%
        </Text>
      ))}
      <View className="flex-row items-center mb-2">
        <FontAwesome size={16} name="shopping-cart" color="#9B9B9B" />
        <Text className="text-xs text-gray-500 font-pregular ml-2">
          {product.data.amount}
        </Text>
      </View>
      <Text className="text-lg font-pbold text-secondary-200">{product.data.price}đ</Text>

      {product.data.detail.map((item, index) => (
        <Text key={index} className="font-pregular text-sm mb-2" >
          Detail: {item.details}
        </Text>
      ))}

      <View
        style={{ height: 1, backgroundColor: '#9B9B9B', marginVertical: 10 }}
      />
      <View className="flex-row mb-2">
        <FontAwesome size={18} name="calendar" color="#9B9B9B" />
        <Text className="font-pbold text-md text-black-200 ml-2">
          Expires on: {new Date(product.data.expire_date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default VoucherDetailScreen;
