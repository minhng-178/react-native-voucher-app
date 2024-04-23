import { qrCustomerPath } from './endpoint';
import axiosInstance from './axiosInstance';

export const getQRsCustomer = async () => {
  try {
    const response = await axiosInstance.get(qrCustomerPath);
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
