'use client';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';
import useMe from '@/hooks/me';

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 를 통해 사용자의 정보를 얻어옴.
    // (백엔드에 api/me를 요청시 클라이언트에서 사용자의 정보를 백엔드에 보내줄 필요는 없음.)
    // (로그인시 브라우져에서 자체적으로 로그인성공시 서버에서 부터 응답헤더에 로그인 토큰(쿠키)을 받아옴.)
    // 이후 요청시에는 헤더에 토큰이 함께 붙어져서 같이 보내짐.
  // 2. 백엔드에서 현재 로그인된 사용자의 세션정보를 이용하여 상세정보를 데이터베이스에서 가져옴.

  const { user, isLoading: loading, error } = useMe();
    //   타입 HomeUser 정의해줌.
  const users = user?.following;
  return (
    <section className='w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
      {loading ? (
        <PropagateLoader size={8} color='red' /> // 로딩스피너
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p> // 사용자가 없거나 사용자가 follwing 하고 있는 사람이 없음.
      )}
      {users && users.length > 0 && ( 
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className='flex flex-col items-center w-20'
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
