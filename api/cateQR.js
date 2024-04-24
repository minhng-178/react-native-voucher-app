import axiosInstance from './axiosInstance';
import { catePath } from './endpoint';

export const getCates = async () => {
  try {
    const response = await axiosInstance.get(catePath);
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
