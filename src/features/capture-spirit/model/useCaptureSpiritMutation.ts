"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { captureSpirit } from "../api/capture-api";
import { Spirit } from "@/shared/lib/zod/schemas";

export function useCaptureSpiritMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: captureSpirit,
    onMutate: async (spiritId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["spirits"] });

      // Snapshot the previous value
      const previousSpirits = queryClient.getQueryData(["spirits"]);

      // Optimistically update to the new value
      queryClient.setQueryData<Spirit[]>(["spirits"], (old) => {
        if (!old) return old;
        return old.map((spirit: Spirit) =>
          spirit.id === spiritId ? { ...spirit, status: "Captured" } : spirit
        );
      });

      // Return a context object with the snapshotted value
      return { previousSpirits };
    },
    onError: (err, spiritId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSpirits) {
        queryClient.setQueryData(["spirits"], context.previousSpirits);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ["spirits"] });
    },
  });
}
