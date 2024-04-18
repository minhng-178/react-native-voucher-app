import { Alert } from 'react-native';
import axiosInstance from './axiosInstance';

export const getUser = async id => {
  const url = `/user/${id}`;

  console.log(id);

  try {
    const response = await axiosInstance.get(url);
    if (response.status === 200) {
      console.log('Get user successful', response.data);
      return response.data;
    } else {
      Alert.alert('Error', 'Failed to get user' + JSON.stringify(response));
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
