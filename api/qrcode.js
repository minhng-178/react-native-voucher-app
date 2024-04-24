import axiosInstance from './axiosInstance';
import { qrCodePath } from './endpoint';

export const getQRsCode = async id => {
  try {
    const response = await axiosInstance.get(qrCodePath(id));
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
