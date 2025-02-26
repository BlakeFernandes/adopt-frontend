import { addPuppy, deletePuppy, updatePuppy } from "@/lib/PuppyFilter";
import { Puppy, PuppyWithId } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function usePuppyMutation() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (puppy: Puppy) => addPuppy(puppy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["puppies"] });
      toast.success("Create Success");
    },
    onError: (error) => {
      toast.error("Create Error", {
        description: error.message,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (puppy: PuppyWithId) => updatePuppy(puppy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["puppies"] });
      toast.success("Update Success");
    },
    onError: (error) => {
      toast.error("Update Error", {
        description: error.message,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (puppyId: string) => deletePuppy(puppyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["puppies"] });
      toast.success("Delete Success");
    },
    onError: (error) => {
      toast.error("Delete Error", {
        description: error.message,
      });
    },
  });

  return {
    mutation: {
      add: addMutation,
      update: updateMutation,
      delete: deleteMutation,
    },
  };
}
