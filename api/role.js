import { Alert } from 'react-native';
import axiosInstance from './axiosInstance';

export const getRoles = async () => {
  const url = '/roles';

  try {
    const response = await axiosInstance.get(url);
    if (response.status === 201) {
      return response.data;
    } else {
      Alert.alert('Error', 'Failed to get roles' + JSON.stringify(response));
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
