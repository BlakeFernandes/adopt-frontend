"use client";

import { Puppy, PuppyWithId } from "@/app/page";
import FilterControls from "@/components/FilterControls";
import PuppyForm from "@/components/PuppyForm";
import PuppyTable from "@/components/PuppyTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import usePuppyMutation from "@/hooks/usePuppyMutation";
import usePuppySearch from "@/hooks/usePuppySearch";
import { useState } from "react";

export default function AdminPuppyManagement() {
  const { search, filter, query } = usePuppySearch();
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
        puppies={query.data || []}
        isLoading={query.isLoading}
        onEdit={(puppy) => {
          setSelectedPuppy(puppy);
          setIsDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

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
