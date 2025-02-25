"use client";

import PuppyForm from "@/components/CreatePuppyForm";
import FilterControls from "@/components/FilterControls";
import PuppyPagination from "@/components/PuppyPagination";
import PuppyTable from "@/components/PuppyTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import usePuppyMutation from "@/hooks/usePuppyMutation";
import usePuppySearch from "@/hooks/usePuppySearch";
import { Puppy, PuppyWithId } from "@/lib/types";
import { useState } from "react";

export default function AdminPuppyManagement() {
  const { search, filter, page, query } = usePuppySearch();
  // made this a hook exposing var mutation to avoid mistake imports
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

  if (query.isError) return <p>Error loading puppies.</p>;

  return (
    <div className="test">
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

      <PuppyTable
        puppies={query.data?.puppies || []}
        isLoading={query.isLoading}
        onEdit={(puppy) => {
          setSelectedPuppy(puppy);
          setIsDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <PuppyPagination page={page} lastPage={query.data?.lastPage ?? 0} />

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
    </div>
  );
}
