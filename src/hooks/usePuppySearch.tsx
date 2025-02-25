import { fetchPuppies } from "@/lib/PuppyFilter";
import { Filters } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function usePuppySearch(
  initialQuery: string = "",
  initialFilters: Filters = {
    breed: "",
    age: "",
    size: "",
    gender: "",
  }
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawPageParam = searchParams.get("page");

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const [page, setPage] = useState<number>(Number(rawPageParam) || 1);
  const [filters, setFilters] = useState<Omit<Filters, "page">>(initialFilters);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["puppies", debouncedSearchQuery, filters, page],
    queryFn: () => fetchPuppies(debouncedSearchQuery, filters, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });

  const updatePage = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
    setPage(newPage);
  };

  useEffect(() => {
    if (rawPageParam && isNaN(Number(rawPageParam))) {
      updatePage(1);
    }
  }, [rawPageParam]);

  return {
    search: { query: searchQuery, setQuery: setSearchQuery },
    filter: { values: filters, setValues: setFilters },
    page: { value: page, setPage: updatePage },
    query: { data, isLoading, isError },
  };
}
