import { usersPath } from './endpoint';
import axiosInstance from './axiosInstance';

export const getUser = async id => {
  try {
    const response = await axiosInstance.get(usersPath(id));

    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
