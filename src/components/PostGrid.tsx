import PostGridCard from './PostGridCard';
import GridSpinner from './ui/GridSpinner';
import usePosts from '@/hooks/posts';

type Props = {
  username: string;
  query: string;
};
export default function PostGrid() {
  const { posts, isLoading } = usePosts();

  return (
    <div className='w-full text-center'>
      {isLoading && <GridSpinner />}
      <ul className='grid grid-cols-3 gap-4 py-4 px-8'>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
              {/* 앞부분 6개에 한해서 priority를 지정해 먼저 준비되도록 함. */}
            </li>
          ))}
      </ul>
    </div>
  );
} 
