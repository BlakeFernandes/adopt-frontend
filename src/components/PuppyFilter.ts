import { Puppy } from "@/app/page";

export type Filters = {
  gender: string;
  size: string;
  age: string;
  breed: string;
};

export async function fetchPuppies(
  searchQuery: string,
  filters: Filters
): Promise<Puppy[]> {
  const queryParams = new URLSearchParams();

  if (searchQuery) queryParams.append("search", searchQuery);
  if (filters.breed) queryParams.append("breed", filters.breed);
  if (filters.age) queryParams.append("age", filters.age);
  if (filters.size) queryParams.append("size", filters.size);
  if (filters.gender) queryParams.append("gender", filters.gender);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/puppies?${queryParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch puppies");
  }

  return response.json();
}
