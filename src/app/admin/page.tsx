"use client";

import { Puppy, PuppyWithId } from "@/app/page";
import FallbackImage from "@/components/FallbackImage";
import FilterControls from "@/components/FilterControls";
import { addPuppy, deletePuppy, updatePuppy } from "@/components/PuppyFilter";
import PuppyForm from "@/components/PuppyForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import usePuppySearch from "@/hooks/usePuppySearch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AdminPuppyManagement() {
  const queryClient = useQueryClient();
  const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { search, filter, query } = usePuppySearch();

  const addMutation = useMutation({
    mutationFn: (puppy: Puppy) => addPuppy(puppy),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["puppies"] }),
  });

  const updateMutation = useMutation({
    mutationFn: (puppy: PuppyWithId) => updatePuppy(puppy),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["puppies"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (puppyId: string) => deletePuppy(puppyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["puppies"] }),
  });

  const handleSave = (puppy: Puppy & { _id?: string }) => {
    if (puppy._id) {
      updateMutation.mutate(puppy as PuppyWithId);
    } else {
      addMutation.mutate(puppy);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (puppyId: string) => {
    deleteMutation.mutate(puppyId);
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

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Breed</th>
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {query.isLoading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              query.data?.map((puppy) => (
                <tr key={puppy._id} className="border-t">
                  <td className="px-4 py-2 border items-center">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 overflow-hidden rounded-full">
                        <FallbackImage
                          src={puppy.photoUrl}
                          alt={puppy.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {puppy.name}
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{puppy.breed}</td>
                  <td className="px-4 py-2 border">{puppy.age}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => {
                        setSelectedPuppy(puppy);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(puppy._id)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
