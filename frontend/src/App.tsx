import { Palette } from "lucide-react"; // Import Lucide icon
import AddColorForm from "./components/AddColorForm";
import ColorFilter from "./components/ColorFilter";
import ColorList from "./components/colorList";

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-lg bg-gray-800 text-white shadow-xl rounded-lg p-6 border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center flex items-center justify-center gap-2 mb-8">
          <Palette className="text-yellow-400" />
          Color Manager
        </h1>
        <ColorFilter />
        <AddColorForm />
        <ColorList />
      </div>
    </div>
  );
};

export default App;
