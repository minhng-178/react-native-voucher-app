import { Alert } from 'react-native';
import { qrCustomerPath } from './endpoint';
import axiosInstance from './axiosInstance';

export const getQRsCustomer = async () => {
  try {
    const response = await axiosInstance.get(qrCustomerPath);
    if (response.status === 201) {
      return response.data;
    } else {
      Alert.alert('Error', 'Failed to get roles' + JSON.stringify(response));
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
