import "./ColorList.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchColors, deleteColor } from "../api/colors";
import ListItem from "./ListItem";
import Button from "./Button";
import Spinner from "./Spinner";

interface Color {
  id: number;
  name: string;
  hex: string;
}

interface ColorListProps {
  search: string;
}

const ColorList: React.FC<ColorListProps> = ({ search }) => {
  const {
    data: colors = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Color[]>({
    queryKey: ["colors", search],
    queryFn: ({ queryKey }) => fetchColors(queryKey[1] as string),
    enabled: !!search,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteColor(id),
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div>
      <div className="flex justify-center mb-2 mt-12">
        <Button onClick={() => refetch()}>Load Colors</Button>
      </div>
      <div className="mt-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 rounded-lg border border-gray-700">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-400 text-center">Error loading colors.</p>
        ) : colors.length === 0 ? (
          <p className="text-white text-center opacity-80">No colors found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 scrollbar-thick mb-24">
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
    </div>
  );
};

export default ColorList;
