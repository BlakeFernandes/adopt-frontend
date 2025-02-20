"use client";

import FilterControls from "@/components/FilterControls";
import { PuppyCard } from "@/components/PuppyCard";
import { fetchPuppies, Filters } from "@/components/PuppyFilter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export type Puppy = {
  _id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  photoUrl: string;
  traits: string[];
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // debounce da puppies so we no spam backend
  const [filters, setFilters] = useState<Filters>({
    breed: "",
    age: "",
    size: "",
    gender: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["puppies", debouncedSearchQuery, filters],
    queryFn: () => fetchPuppies(debouncedSearchQuery, filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <>
      <FilterControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isError && <p>Something went wrong...</p>}
        {isLoading && <p>Loading...</p>}
        {Array.isArray(data) &&
          // Check why we're re-fetching images on every render
          // Might be cache-control: no-cache?
          data.map((puppy) => <PuppyCard key={puppy._id} puppy={puppy} />)}
      </div>
    </>
  );
}
