import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addColor } from "../api/colors";
import { SketchPicker } from "react-color";
import { Plus, CheckCircle } from "lucide-react";
import Button from "./Button";
import Input from "./Input";

interface Color {
  name: string;
  hex: string;
}

const AddColorForm = () => {
  const [name, setName] = useState("");
  const [hex, setHex] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; hex?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (color: Color) => addColor(color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      setName("");
      setHex("");
      setErrors({});
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    },
  });

  const isValidHex = (hex: string) => /^#[0-9A-Fa-f]{6}$/.test(hex);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; hex?: string } = {};

    if (!name.trim()) {
      newErrors.name = "color name is required";
    }
    if (!hex.trim()) {
      newErrors.hex = "hex code is required";
    } else if (!isValidHex(hex)) {
      newErrors.hex = "must start with # and have 6 chars";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addMutation.mutate({ name, hex });
  };

  return (
    <div className="relative">
      {showSuccess && (
        <div className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle className="w-5 h-5" />
          Color successfully added!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-center w-fit mx-auto gap-3 bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600 relative"
      >
        {showPicker && (
          <div className="absolute z-10 top-14 left-0">
            <SketchPicker
              color={hex}
              onChange={(color) => {
                setHex(color.hex);
                setErrors((prev) => ({ ...prev, hex: "" }));
              }}
            />
          </div>
        )}

        <div className="relative">
          <Input
            placeholder="Click and pick (#FFFFFF)"
            value={hex}
            onChange={(e) => {
              setHex(e.target.value);
              if (isValidHex(e.target.value)) {
                setErrors((prev) => ({ ...prev, hex: "" }));
              }
            }}
            onClick={() => setShowPicker(!showPicker)}
            className={`p-2 rounded-md italic border ${
              errors.hex ? "border-red-500" : "border-gray-300"
            }`}
            style={{ backgroundColor: hex }}
          />
          {errors.hex && (
            <p className="text-red-500 text-xs mt-1">{errors.hex}</p>
          )}
        </div>

        <div className="relative">
          <Input
            placeholder="Add color name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" })); // Clear error
            }}
            onClick={() => setShowPicker(false)}
            className={`p-2 rounded-md italic border ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <Button
          type="submit"
          customStyles="relative group flex items-center border rounded justify-center gap-2 p-2 cursor-pointer h-[41px] hover:bg-white/30"
        >
          <Plus className="w-5 h-5" />
          <span className="absolute w-18 -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Add Color
          </span>
        </Button>
      </form>
    </div>
  );
};

export default AddColorForm;
