import { paymentPath } from './endpoint';
import axiosInstance from './axiosInstance';

export const createPayment = async id => {
  const data = {
    order_ids: [id],
  };

  try {
    const response = await axiosInstance.post(paymentPath, data);

    if (response.status === 201) {
      console.log(response.data);
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
