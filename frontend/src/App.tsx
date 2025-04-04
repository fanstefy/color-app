import { useState } from "react";
import { Palette } from "lucide-react";
import AddColorForm from "./components/AddColorForm";
import ColorList from "./components/ColorList";
import ColorFilter from "./components/ColorFilter";

const App: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-center items-center bg-gray-700 mt-12">
      <div className="w-[900px] h-[800px] bg-gray-700 text-white shadow-xl rounded-lg p-6 border border-gray-700 flex flex-col">
        <h1 className="text-3xl font-extrabold text-center flex items-center justify-center gap-2 mb-4">
          <Palette className="text-yellow-400" />
          Color Manager
        </h1>

        <ColorFilter setSearch={setSearch} />
        <AddColorForm />

        <div className="flex-grow overflow-hidden">
          <ColorList search={search} />
        </div>
      </div>
    </div>
  );
};

export default App;
