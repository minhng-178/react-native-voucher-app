import axios from 'axios';
import { uploadPath } from './endpoint';

export const uploadImage = async file => {
  const form = new FormData();

  const fileName = file.uri.split('/').pop();

  form.append('image', {
    uri: file.uri,
    name: fileName,
    type: file.mimeType,
  });

  try {
    const response = await axios.post(
      `http://20.243.125.223:3000/api/v1/${uploadPath}`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Image upload failed:', response.data.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};
