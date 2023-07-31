import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Comment, FullPost } from '@/model/post';

async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig(); // post(post detail)와 posts(postListCard)의 코멘트수가 연동되지 않음. so globalMutate를 사용하여 서로 연결함

  const postComment = useCallback( //useCallback 한번 실행후 외부에서 받는  [post, mutate, globalMutate] 변경시에만 다시 실행해줌.
    (comment: Comment) => {
      if (!post) return;
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts')); //globalMutate를 사용해 /api/posts 를 업데이트함.
    },
    [post, mutate, globalMutate]
  );
  return { post, isLoading, error, postComment };
}
 