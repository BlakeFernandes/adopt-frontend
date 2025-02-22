import { fetchPuppies, Filters } from "@/components/PuppyFilter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function usePuppySearch(
  initialQuery: string = "",
  initialFilters: Filters = { breed: "", age: "", size: "", gender: "" }
) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["puppies", debouncedSearchQuery, filters],
    queryFn: () => fetchPuppies(debouncedSearchQuery, filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    search: { query: searchQuery, setQuery: setSearchQuery },
    filter: { values: filters, setValues: setFilters },
    query: { data, isLoading, isError },
  };
}
