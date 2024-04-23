import axiosInstance from './axiosInstance';
import { qrCustomerPath, qrHostCreatePath, qrIdPath, qrPath } from './endpoint';

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

export const createQR = async form => {
  const data = {
    name: form.name,
    price: Number(form.price),
    image_url: form.image,
    expire_date: form.expiredDate,
    amount: form.amount,
    categories: [],
    discounts: [
      {
        discount: Number(form.discounts.discount),
        currency: form.discounts.currency,
        min_price: Number(form.discounts.min_price),
      },
    ],
    details: [
      {
        detail: form.details.detail,
        step: form.details.step,
      },
    ],
  };

  try {
    const response = await axiosInstance.post(qrHostCreatePath, data);
    if (response.status === 201) {
      console.log('Create success', response.data);
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
