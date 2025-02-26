import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function usePageNumber() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname;

  const rawPageParam = searchParams.get("page");
  const initialPage = Number(rawPageParam || 1);

  const [page, setPage] = useState(initialPage);

  const updatePage = (newPage: number) => {
    router.push(pathname + `?page=${newPage}`);
    setPage(newPage);
  };

  useEffect(() => {
    if (rawPageParam && isNaN(Number(rawPageParam))) {
      updatePage(1);
    }
  }, [rawPageParam]);

  return { page, setPage };
}
