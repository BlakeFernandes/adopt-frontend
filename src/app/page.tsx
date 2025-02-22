"use client";

import FilterControls from "@/components/FilterControls";
import { PuppyCard } from "@/components/PuppyCard";
import usePuppySearch from "@/hooks/usePuppySearch";

export type Puppy = {
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

export type PuppyWithId = Puppy & { _id: string };

export default function Home() {
  const { search, filter, query } = usePuppySearch();

  return (
    <>
      <FilterControls
        searchQuery={search.query}
        setSearchQuery={search.setQuery}
        filters={filter.values}
        setFilters={filter.setValues}
      />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {query.isError && <p>Something went wrong...</p>}
        {query.isLoading && <p>Loading...</p>}
        {Array.isArray(query.data) &&
          // Check why we're re-fetching images on every render
          // Might be cache-control: no-cache?
          query.data.map((puppy) => (
            <PuppyCard key={puppy._id} puppy={puppy} />
          ))}
      </div>
    </>
  );
}
