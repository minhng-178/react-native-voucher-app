import { Alert } from 'react-native';
import { usersPath } from './endpoint';
import axiosInstance from './axiosInstance';

export const getUser = async id => {
  try {
    const response = await axiosInstance.get(usersPath(id));

    if (response.status === 201) {
      return response.data;
    } else {
      Alert.alert('Error', 'Failed to get user' + JSON.stringify(response));
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
