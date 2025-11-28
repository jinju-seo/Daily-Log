import { signInWIthOAuth } from "@/api/auth";
import type { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithOAuth(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWIthOAuth,
    onError:(error) => {
        if (callbacks?.onError) callbacks.onError(error)
    }
  });
}
