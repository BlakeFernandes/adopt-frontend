import { fetchPuppy } from "@/components/PuppyFilter";
import { useQuery } from "@tanstack/react-query";

export default function usePuppy(id: string) {
  return useQuery({
    queryKey: ["puppy", id],
    queryFn: () => fetchPuppy(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // ensures the query doesn't run until id is available
  });
}
