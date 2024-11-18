import axios from './axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('/products/category/smartphones');
    return response.data;
  } catch (error) {
    throw error;
  }
};