import { Trash2 } from "lucide-react";
import Button from "./Button";
import { motion } from "framer-motion";

interface Color {
  id: number;
  name: string;
  hex: string;
}

interface ListItemProps {
  color: Color;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  index: number;
}

const ListItem: React.FC<ListItemProps> = ({
  color,
  onDelete,
  isDeleting,
  index,
}) => {
  return (
    <motion.li
      className="p-4 rounded-lg shadow-lg flex justify-between items-center border border-gray-700"
      style={{ backgroundColor: color.hex }}
      initial={{ opacity: 0, x: 3 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex flex-col">
        <span className="text-white font-semibold text-lg drop-shadow-md">
          {color.name}
        </span>
        <span className="text-white opacity-80 text-sm">{color.hex}</span>
      </div>

      <Button
        customStyles="ml-4 flex items-center justify-center p-2"
        onClick={() => onDelete(color.id)}
        disabled={isDeleting}
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9, rotate: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Trash2 className="w-5 h-5 cursor-pointer" />
        </motion.div>
      </Button>
    </motion.li>
  );
};

export default ListItem;
