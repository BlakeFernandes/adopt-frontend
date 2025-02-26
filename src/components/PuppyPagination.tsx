import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PuppyPagination({
  page,
  setPage,
  lastPage,
}: {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
}) {
  return (
    <Pagination className="pt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(page - 1)}
            className={page <= 1 ? "invisible" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(page + 1)}
            aria-disabled={true}
            tabIndex={-1}
            className={page >= lastPage ? "invisible" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
