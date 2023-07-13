import axios from 'axios';
import { Recipe } from '../store/recipeStore';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getMany = async (page: number): Promise<Recipe[]> => {
  try {
    const response = await api.get('/', { params: { page } });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getOne = async (id: string): Promise<Recipe> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default { getMany, getOne };
