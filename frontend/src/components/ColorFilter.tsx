import { useState } from "react";
import { useColorStore } from "../store/colorStore";
import { Search } from "lucide-react"; // Search icon
import Button from "./Button";
import Input from "./Input";

const ColorFilter = () => {
  const [query, setQuery] = useState("");
  const { fetchColors } = useColorStore();

  const handleSearch = () => {
    fetchColors(query);
  };

  return (
    <div className="flex gap-3 mb-6">
      <div className="input-text-wrapper">
        <Input
          placeholder="Search colors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full h-[40px] leading-[50px] outline-none px-[40px] rounded-[10px] border border-black/40 bg-white/30"
        />
        <Button onClick={handleSearch}>
          <Search className="w-5 h-5 inline-block mr-2" />
        </Button>
      </div>
    </div>
  );
};

export default ColorFilter;
