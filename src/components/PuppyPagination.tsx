import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PuppyPagination({
  page,
  lastPage,
}: {
  page: {
    value: number;
    setPage: (newPage: number) => void;
  };
  lastPage: number;
}) {
  return (
    <Pagination className="pt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page.setPage(page.value - 1)}
            className={page.value <= 1 ? "invisible" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => page.setPage(page.value + 1)}
            aria-disabled={true}
            tabIndex={-1}
            className={page.value >= lastPage ? "invisible" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
