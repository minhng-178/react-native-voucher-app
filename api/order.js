import axiosInstance from './axiosInstance';
import { orderPath } from './endpoint'; // Import orderPath from your endpoint file

export const createOrder = async form => {
  const data = {
    name_recieve: form.name_recieve,
    note: '',
    email_recieve: form.email_recieve,
    qrs: form.qrs.map(qr => ({
      qr_id: qr.qr_id,
      amount: Number(qr.amount),
    })),
  };

  console.log(data);

  try {
    const response = await axiosInstance.post(orderPath, data);

    if (response.status === 201) {
      console.log('Tạo đơn hàng thành công', response.data);
      return response.data;
    } else {
      console.error('Lỗi tạo đơn hàng:', response.data.message);
      throw new Error(
        response.data.message || 'Đã xảy ra lỗi khi tạo đơn hàng của bạn.',
      );
    }
  } catch (error) {
    if (error.response) {
      console.error('Lỗi tạo đơn hàng:', error.response.data.message);
      throw new Error(
        error.response.data.message ||
          'Đã xảy ra lỗi khi tạo đơn hàng của bạn.',
      );
    } else {
      console.error('Lỗi tạo đơn hàng:', error.message);
      throw new Error('Đã xảy ra lỗi khi tạo đơn hàng của bạn.');
    }
  }
};
