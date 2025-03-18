import { useEffect } from "react";
import { useColorStore } from "../store/colorStore";
import { Trash2 } from "lucide-react";
import Button from "./Button";

const ColorList = () => {
  const { colors, fetchColors, removeColor } = useColorStore();

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="mt-6">
      {colors.length === 0 ? (
        <p className="text-white text-center opacity-80">No colors found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {colors.map((color) => (
            <li
              key={color.id}
              className="p-4 rounded-lg shadow-lg flex justify-between items-center border border-gray-700"
              style={{ backgroundColor: color.hex }}
            >
              <div className="flex flex-col">
                <span className="text-white font-semibold text-lg drop-shadow-md">
                  {color.name}
                </span>
                <span className="text-white opacity-80 text-sm">
                  {color.hex}
                </span>
              </div>

              <Button
                className="ml-4 flex items-center justify-center p-2"
                onClick={() => removeColor(color.id)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ColorList;
