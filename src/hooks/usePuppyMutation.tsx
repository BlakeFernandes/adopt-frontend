import { Puppy, PuppyWithId } from "@/app/page";
import { addPuppy, deletePuppy, updatePuppy } from "@/components/PuppyFilter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePuppyMutation() {
  const queryClient = useQueryClient();

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

  return {
    mutation: {
      add: addMutation,
      update: updateMutation,
      delete: deleteMutation,
    },
  };
}
