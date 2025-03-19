import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/colors";

export interface Color {
  id: number;
  name: string;
  hex: string;
}

export const fetchColors = async (search?: string): Promise<Color[]> => {
  const response = await axios.get<Color[]>(API_URL, {
    params: search ? { search } : {},
  });
  return response.data;
};

export const addColor = async (color: { name: string; hex: string }) => {
  const response = await axios.post(API_URL, color);
  return response.data;
};

export const deleteColor = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
