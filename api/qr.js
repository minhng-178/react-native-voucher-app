import axiosInstance from './axiosInstance';
import { qrCustomerPath, qrIdPath, qrPath } from './endpoint';

export const getQRs = async () => {
  try {
    const response = await axiosInstance.get(qrPath);
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getQR = async id => {
  try {
    const response = await axiosInstance.get(qrIdPath(id));

    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

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
