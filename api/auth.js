import { Alert } from 'react-native';
import axiosInstance from './axiosInstance';

export const login = async (email, password) => {
  const url = '/login';
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axiosInstance.post(url, data);
    if (response.status === 200) {
      Alert.alert('Success', 'User signed in successfully');
      return [response.data.user, response.data.tokens];
    } else {
      Alert.alert('Error', 'Login failed' + JSON.stringify(response));
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
