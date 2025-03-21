import { useState, useCallback, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import Input from "./Input";

interface ColorFilterProps {
  setSearch: (query: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearch(query);
    }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  }, []);

  return (
    <div className="mb-6">
      <div className="flex gap-3 relative w-[300px] m-auto mt-4 mb-4 rounded-[10px] hover:bg-white/30">
        <Search    
          data-testid="lucide-icon"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          placeholder="Search colors..."
          value={inputValue}
          onChange={handleInputChange}
          className="block w-full h-[40px] leading-[50px] outline-none px-[40px] rounded-[10px] border border-black/40 italic"
        ></Input>
      </div>
    </div>
  );
};

export default ColorFilter;
