import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/colors";

export interface Color {
  id: number;
  name: string;
  hex: string;
}

export const fetchColors = async (search?: string): Promise<Color[]> => {
  try {
    const response = await axios.get<Color[]>(API_URL, {
      params: search ? { search } : {},
    });

    if (!Array.isArray(response.data)) {
      console.error("Unexpected API response:", response.data);
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};

export const addColor = async (color: { name: string; hex: string }) => {
  try {
    const response = await axios.post(API_URL, color);
    return response.data;
  } catch (error) {
    console.error("Error adding color:", error);
    throw new Error("Failed to add color. Please try again.");
  }
};

export const deleteColor = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting color with ID ${id}:`, error);
    throw new Error("Failed to delete color. Please try again.");
  }
};
