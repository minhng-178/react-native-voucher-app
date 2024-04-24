import axiosInstance from './axiosInstance';
import {
  qrCustomerPath,
  qrHostCreatePath,
  qrHostUpdatePath,
  qrIdPath,
  qrPath,
} from './endpoint';

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

export const getHostQrs = async () => {
  try {
    const response = await axiosInstance.get(
      'http://20.243.125.223:3000/api/v1/host/qr?sortBy=amount:asc',
    );
    if (response.status === 200) {
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
        discount: Number(form.discounts[0].discount),
        currency: form.discounts[0].currency,
        min_price: Number(form.discounts[0].min_price),
      },
    ],
    details: [
      {
        detail: form.details[0].detail,
        step: Number(form.details[0].step),
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

export const updateQR = async (form, id) => {
  const data = {
    name: form.name,
    price: Number(form.price),
    image_url: form.image,
    expire_date: form.expiredDate,
    amount: form.amount,
    categories: [],
    discounts: [
      {
        discount: Number(form.discounts[0].discount),
        currency: form.discounts[0].currency,
        min_price: Number(form.discounts[0].min_price),
      },
    ],
    details: [
      {
        detail: form.details[0].detail,
        step: Number(form.details[0].step),
      },
    ],
  };

  try {
    const response = await axiosInstance.patch(qrHostUpdatePath(id), data);
    if (response.status === 201) {
      console.log('Update success', response.data);
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
