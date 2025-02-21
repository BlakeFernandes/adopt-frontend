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

export async function fetchPuppy(id: string): Promise<Puppy> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/puppies/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch puppy");
  }

  return response.json();
}

export async function addPuppy(puppy: Puppy) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/puppies`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(puppy),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add puppy");
  }
  return response.json();
}

export async function updatePuppy(puppy: Puppy) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/puppies/${puppy._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(puppy),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update puppy");
  }
  return response.json();
}

export async function deletePuppy(puppyId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/puppies/${puppyId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete puppy");
  }
  return response.json();
}
