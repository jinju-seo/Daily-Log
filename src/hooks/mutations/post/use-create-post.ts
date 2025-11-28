import { createPostWithImages } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/store/session";

export function useCreatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      // 전체 게시물 목록 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.list,
      });
      // 현재 사용자의 게시물 목록 무효화
      if (session?.user.id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.post.userList(session.user.id),
        });
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
