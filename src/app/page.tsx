"use client";

import FilterControls from "@/components/FilterControls";
import { PuppyCard } from "@/components/PuppyCard";
import PuppyPagination from "@/components/PuppyPagination";
import { usePageNumber } from "@/hooks/usePageNumber";
import usePuppySearch from "@/hooks/usePuppySearch";
import { PuppyWithId } from "@/lib/types";
import { Suspense } from "react";

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

      <Suspense fallback={<p>Loading...</p>}>
        <PuppyList
          isError={query.isError}
          isLoading={query.isLoading}
          puppies={query.data?.puppies || []}
          lastPage={query.data?.lastPage ?? 1}
        />
      </Suspense>
    </>
  );
}

function PuppyList({
  isError,
  isLoading,
  puppies,
  lastPage,
}: {
  isError: boolean;
  isLoading: boolean;
  puppies: PuppyWithId[];
  lastPage: number;
}) {
  const { page, setPage } = usePageNumber();

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isError && <p>Something went wrong...</p>}
        {isLoading && <p>Loading...</p>}
        {puppies.map((puppy) => (
          <PuppyCard key={puppy._id} puppy={puppy} />
        ))}
      </div>

      <PuppyPagination page={page} setPage={setPage} lastPage={lastPage ?? 0} />
    </>
  );
}
