"use client";

import FilterControls from "@/components/FilterControls";
import { PuppyCard } from "@/components/PuppyCard";
import PuppyPagination from "@/components/PuppyPagination";
import usePuppySearch from "@/hooks/usePuppySearch";

export default function Home() {
  const { search, filter, page, query } = usePuppySearch();

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
        {Array.isArray(query.data?.puppies) &&
          query.data.puppies.map((puppy) => (
            <PuppyCard key={puppy._id} puppy={puppy} />
          ))}
      </div>

      <PuppyPagination page={page} lastPage={query.data?.lastPage ?? 0} />
    </>
  );
}
