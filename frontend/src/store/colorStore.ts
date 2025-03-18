import { create } from "zustand";
import { getColors, addColor, deleteColor } from "../api/colors";

interface Color {
  id: number;
  name: string;
  hex: string;
}

interface ColorStore {
  colors: Color[];
  fetchColors: (search?: string) => Promise<void>;
  addNewColor: (name: string, hex: string) => Promise<void>;
  removeColor: (id: number) => Promise<void>;
}

export const useColorStore = create<ColorStore>((set) => ({
  colors: [],

  fetchColors: async (search) => {
    const colors = await getColors(search);
    set({ colors });
  },

  addNewColor: async (name, hex) => {
    const newColor = await addColor(name, hex);
    if (newColor) {
      set((state) => ({ colors: [...state.colors, newColor] }));
    }
  },

  removeColor: async (id) => {
    await deleteColor(id);
    set((state) => ({
      colors: state.colors.filter((color) => color.id !== id),
    }));
  },
}));
