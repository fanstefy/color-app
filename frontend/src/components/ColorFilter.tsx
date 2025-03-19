import { useState } from "react";
import { Search } from "lucide-react";
import Button from "./Button";
import Input from "./Input";

interface ColorFilterProps {
  setSearch: (query: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearch(inputValue);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-3 relative w-[300px] m-auto mt-4 mb-4 rounded-[10px] hover:bg-white/30">
        <Input
          placeholder="Search colors..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full h-[40px] leading-[50px] outline-none px-[40px] rounded-[10px] border border-black/40 "
          setFocus={true}
        />
        <Button
          customStyles="outline-none absolute right-1 top-[8px] hover:rounded-full hover:bg-gray-400"
          onClick={handleSearch}
        >
          <Search
            viewBox="-13 -2 34 34"
            className="w-4 h-4 inline-block mr-2"
          />
        </Button>
      </div>
    </div>
  );
};

export default ColorFilter;
