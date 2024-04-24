import { orderIdPath, orderPath, orderUserPath } from './endpoint';
import axiosInstance from './axiosInstance';

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get(orderPath);
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrdersCustomer = async id => {
  try {
    const response = await axiosInstance.get(orderUserPath(id));
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrder = async id => {
  try {
    const response = await axiosInstance.get(orderIdPath(id));
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const createOrder = async dataOrder => {
  const data = {
    name_recieve: dataOrder.name_recieve,
    note: dataOrder.note || 'User have no note',
    email_recieve: dataOrder.email_recieve,
    qrs: dataOrder.qrs.map(qr => ({
      qr_id: qr.qr_id,
      amount: Number(qr.amount),
    })),
  };

  try {
    const response = await axiosInstance.post(orderPath, data);

    if (response.status === 201) {
      console.log('Create order successful.', response.data);
      return response.data;
    } else {
      console.error('Lỗi tạo đơn hàng:', response.data.message);
    }
  } catch (error) {
    throw new Error('Đã xảy ra lỗi khi tạo đơn hàng của bạn.');
  }
};
