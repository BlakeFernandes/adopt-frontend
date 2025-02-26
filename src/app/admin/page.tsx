"use client";

import PuppyForm from "@/components/CreatePuppyForm";
import FilterControls from "@/components/FilterControls";
import PuppyPagination from "@/components/PuppyPagination";
import PuppyTable from "@/components/PuppyTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usePageNumber } from "@/hooks/usePageNumber";
import usePuppyMutation from "@/hooks/usePuppyMutation";
import usePuppySearch from "@/hooks/usePuppySearch";
import { FetchAllPuppies, Puppy, PuppyWithId } from "@/lib/types";
import { Suspense, useState } from "react";

export default function AdminPuppyManagement() {
  const { search, filter, query } = usePuppySearch();
  const { mutation } = usePuppyMutation();

  const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (puppy: Puppy & { _id?: string }) => {
    if (puppy._id) mutation.update.mutate(puppy as PuppyWithId);
    else mutation.add.mutate(puppy);
    setIsDialogOpen(false);
  };

  const handleDelete = (puppyId: string) => {
    mutation.delete.mutate(puppyId);
  };

  if (query.isError) {
    return <p>Error loading puppies.</p>;
  }

  return (
    <>
      <FilterControls
        searchQuery={search.query}
        setSearchQuery={search.setQuery}
        filters={filter.values}
        setFilters={filter.setValues}
      />

      <Button
        onClick={() => {
          setSelectedPuppy(null);
          setIsDialogOpen(true);
        }}
        variant={"outline"}
      >
        Add Puppy
      </Button>

      <Suspense fallback={<p>Loading...</p>}>
        <AdminPuppyTable
          query={query}
          onEdit={(puppy) => {
            setSelectedPuppy(puppy);
            setIsDialogOpen(true);
          }}
          onDelete={handleDelete}
        />
      </Suspense>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>
              {selectedPuppy ? "Edit Puppy" : "Add Puppy"}
            </DialogTitle>
            <PuppyForm puppy={selectedPuppy} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function AdminPuppyTable({
  query,
  onEdit,
  onDelete,
}: {
  query: {
    data: FetchAllPuppies | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  onEdit: (puppy: Puppy) => void;
  onDelete: (puppyId: string) => void;
}) {
  const { page, setPage } = usePageNumber();

  return (
    <>
      <PuppyTable
        puppies={query.data?.puppies || []}
        isLoading={query.isLoading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <PuppyPagination
        page={page}
        setPage={setPage}
        lastPage={query.data?.lastPage ?? 0}
      />
    </>
  );
}
