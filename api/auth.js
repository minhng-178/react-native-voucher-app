import { Alert } from 'react-native';
import axiosInstance from './axiosInstance';
import { loginPath, registerPath } from './endpoint';

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axiosInstance.post(loginPath, data);

    if (response.status === 400) {
      Alert.alert('Error', 'Email or Password is incorrect');
    }

    if (response.status === 200) {
      return response.data.user;
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (name, email, password) => {
  const data = {
    name: name,
    email: email,
    password: password,
  };
  try {
    console.log(data);

    const response = await axiosInstance.post(registerPath, data);
    if (response.status === 400) {
      Alert.alert('Error', 'Email or Password is incorrect');
    }

    if (response.status === 201) {
      return [response.data.user, response.data.tokens];
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
