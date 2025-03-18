import { useState } from "react";
import { useColorStore } from "../store/colorStore";
import { Plus } from "lucide-react"; // Add icon
import Button from "./Button";
import Input from "./Input";

const AddColorForm = () => {
  const [name, setName] = useState("");
  const [hex, setHex] = useState("");
  const { addNewColor } = useColorStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && hex) {
      addNewColor(name, hex);
      setName("");
      setHex("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600"
    >
      <Input
        placeholder="Color Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Hex Code (#FFFFFF)"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
      />
      <Button type="submit" className="flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Add Color
      </Button>
    </form>
  );
};

export default AddColorForm;
