import { fetchPuppies } from "@/lib/PuppyFilter";
import { Filters } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function usePuppySearch(
  initialQuery: string = "",
  initialFilters: Filters = {
    breed: "",
    age: "",
    size: "",
    gender: "",
  },
  page: number = 1
) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [filters, setFilters] = useState<Omit<Filters, "page">>(initialFilters);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["puppies", debouncedSearchQuery, filters, page],
    queryFn: () => fetchPuppies(debouncedSearchQuery, filters, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });

  return {
    search: { query: searchQuery, setQuery: setSearchQuery },
    filter: { values: filters, setValues: setFilters },
    query: { data, isLoading, isError },
  };
}
