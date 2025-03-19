import "./ColorList.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchColors, deleteColor } from "../api/colors";
import ListItem from "./ListItem";
import Button from "./Button";

interface Color {
  id: number;
  name: string;
  hex: string;
}

interface ColorListProps {
  search: string;
}

const ColorList: React.FC<ColorListProps> = ({ search }) => {
  const queryClient = useQueryClient();

  const {
    data: colors = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Color[]>({
    queryKey: ["colors", search],
    queryFn: ({ queryKey }) => fetchColors(queryKey[1] as string),
    enabled: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteColor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
  });

  return (
    <div className="mt-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 rounded-lg border border-gray-700">
      <div className="flex justify-center mb-4">
        <Button variant="primary" onClick={() => refetch()}>
          Load Colors
        </Button>
      </div>

      {isLoading ? (
        <p className="text-white text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-400 text-center">Error loading colors.</p>
      ) : colors.length === 0 ? (
        <p className="text-white text-center opacity-80">No colors found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 scrollbar-thick">
          {colors.map((color, index) => (
            <ListItem
              key={color.id}
              index={index}
              color={color}
              onDelete={deleteMutation.mutate}
              isDeleting={deleteMutation.status === "pending"}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ColorList;
