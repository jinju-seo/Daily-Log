import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      // 이미지를 삭제하는 기능
      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      // 전체 게시물 목록 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.list,
      });
      // 삭제된 게시물 작성자의 게시물 목록 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.userList(deletedPost.author_id),
      });
      // 삭제된 게시물 상세 정보 캐시 제거
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.post.byId(deletedPost.id),
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
