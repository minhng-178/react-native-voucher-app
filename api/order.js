import { orderPath } from './endpoint';
import axiosInstance from './axiosInstance';
import { useAuth } from '../providers/AuthProvider';

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
