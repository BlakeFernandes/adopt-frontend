import { Puppy, PuppyWithId } from "@/app/page";
import FallbackImage from "./FallbackImage";

interface PuppyTableProps {
  puppies: PuppyWithId[];
  isLoading: boolean;
  onEdit: (puppy: Puppy) => void;
  onDelete: (puppyId: string) => void;
}

export default function PuppyTable({
  puppies,
  isLoading,
  onEdit,
  onDelete,
}: PuppyTableProps) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Breed</th>
            <th className="px-4 py-2 border">Age</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            puppies.map((puppy) => (
              <tr key={puppy._id} className="border-t">
                <td className="px-4 py-2 border items-center">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 overflow-hidden rounded-full">
                      <FallbackImage
                        src={puppy.photoUrl}
                        alt={puppy.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {puppy.name}
                  </div>
                </td>
                <td className="px-4 py-2 border">{puppy.breed}</td>
                <td className="px-4 py-2 border">{puppy.age}</td>
                <td className="px-4 py-2 border">
                  <button onClick={() => onEdit(puppy)}>Edit</button>
                  <button
                    onClick={() => onDelete(puppy._id)}
                    className="ml-2 text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
