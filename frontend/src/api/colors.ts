import axios from "axios";

const API_URL = "http://localhost:5000/colors";

export const getColors = async (search?: string) => {
  try {
    const response = await axios.get(API_URL, { params: { search } });
    return response.data;
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};

export const addColor = async (name: string, hex: string) => {
  try {
    const response = await axios.post(API_URL, { name, hex });
    return response.data;
  } catch (error) {
    console.error("Error adding color:", error);
    return null;
  }
};

export const deleteColor = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting color:", error);
  }
};
