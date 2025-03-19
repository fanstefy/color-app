import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addColor } from "../api/colors";
import { Plus } from "lucide-react";
import Button from "./Button";
import Input from "./Input";

interface Color {
  name: string;
  hex: string;
}

const AddColorForm = () => {
  const [name, setName] = useState("");
  const [hex, setHex] = useState("");
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (color: Color) => addColor(color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
      setName("");
      setHex("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && hex) {
      addMutation.mutate({ name, hex });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-3 bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600"
    >
      <Input
        placeholder="Color Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-[3px] rounded-[5px]"
      />
      <Input
        placeholder="Hex Code (#FFFFFF)"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        className="p-[3px] rounded-[5px]"
      />
      <Button
        type="submit"
        customStyles="flex items-center border rounded justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Color
      </Button>
    </form>
  );
};

export default AddColorForm;
