"use client";
import FallbackImage from "@/components/FallbackImage";
import { fetchPuppy } from "@/components/PuppyFilter";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// might be better to pass the puppy object, and then query for more details
// to prevent the user from seeing the loading state
export default function PuppyPage() {
  const params = useParams();
  const id = params?.slug;

  const {
    data: puppy,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["puppy"],
    queryFn: () => fetchPuppy(id as string),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!puppy || isError)
    return <p className="text-center text-red-500">Puppy not found.</p>;

  return (
    <div className="flex flex-col items-center p-6 pt-24 space-y-4">
      <div className="w-48 h-48 overflow-hidden rounded-full border border-gray-300">
        <FallbackImage
          src={puppy.photoUrl}
          alt={puppy.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-2xl font-semibold mt-4">{puppy.name}</h2>

      <div className="text-grey-600 capitalize text-center">
        <p>
          {puppy.age} years old • {puppy.gender}
        </p>
        <p>Size: {puppy.size}</p>
        <p>{puppy.breed}</p>
        <p>Traits: {puppy.traits.join(", ")}</p>
      </div>

      <div className="flex gap-4">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            puppy.isVaccinated
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {puppy.isVaccinated ? "Vaccinated" : "Not Vaccinated"}
        </span>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            puppy.isNeutered
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {puppy.isNeutered ? "Neutered" : "Not Neutered"}
        </span>
      </div>
    </div>
  );
}
