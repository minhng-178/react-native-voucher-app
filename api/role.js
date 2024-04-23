import { rolesPath } from './endpoint';
import axiosInstance from './axiosInstance';

export const getRoles = async () => {
  try {
    const response = await axiosInstance.get(rolesPath);
    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
