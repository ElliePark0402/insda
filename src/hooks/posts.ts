import useSWR from 'swr';
import { useCallback } from 'react';
import { Comment, SimplePost } from '@/model/post';
import { useCacheKeys } from '@/context/CacheKeysContext';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

// 읽어오는 GET 요청은 swr 사용하면 되고,
// PUT, DELETE, PATCH 같은 수정하는 요청은 일반 fetch API 사용하면 됩니다


export default function usePosts() { // 커스텀 훅인 usePosts가 누가 사용하느냐에 따라서 어떤 cacheKeys 를 사용하면 되는지 알려주면 해결. (각각 다른 페이지에서 post를 불러올때 like가 실시간 작동하지 않는 문제)
  const cacheKeys = useCacheKeys();
  const { data: posts, isLoading, error, mutate} = useSWR<SimplePost[]>(cacheKeys.postsKey);
  const setLike = useCallback( ////useCallback 한번 실행후 외부에서 받는 [posts, mutate] 변경시에만 다시 실행해줌.
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = { // setLike가 변경이 되면 newPost를 만들어줌.
        ...post,
        likes: like ? [...post.likes, username] : post.likes.filter((item) => item !== username), 
        // like가 true라면 기존 post.likes를 가져가면서 username을 추가
        // like가 false라면 새로 filter된 버젼을 만듬. 배열의 아이템(사용자username)이 현재 username이 없는것들만 배열로 다시만들어줌.
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
        // post가 있다면 map을 해줌. 배열안에 있는 post를 p.id가 업데이트를 하고자 하는 post의 아이디와 동일하다면 newPost,
        // 아니라면 기존의 post로 사용
      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts, // 로컬상의 cashe를 newPosts로 먼저 업데이트 해줌
        populateCache: false, // 반환된값을 기존 post data에 덮어씌우지 않도록 설정
        revalidate: false, // 이미 local 에서 update를 미리 해두었으니 백엔드에서 업데이트 된것을 가져올필요는 없음.
        rollbackOnError: true, // 네트워크 통신상에 문제가 있다면 imisticData: newPosts로 업데이트 된것을 취소함
      });
    },
    [posts, mutate]
  ); 

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, setLike, postComment };
}
 