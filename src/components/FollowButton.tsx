'use client';
import useMe from '@/hooks/me';
import {  ProfileUser } from '@/model/user';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';
import Button from './ui/Button';

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  // 사용자페이지에 있는 사용자 정보를 가지고와서 로그인한 사용자가 follow를 하고 있는지 아닌지를 판단
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  
  const router = useRouter(); // 넥스트에서 제공해주는 router를 가지고 옴. to use  'router.refresh();'
  const [isPending, startTransition] = useTransition(); // 리액트에서 제공하는 transition 사용 to use  'router.refresh();'
  const [isFetching, setIsFetching] = useState(false); // follow / unfollow할때 네트워크 요청이 발생시 감지
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
    //로그인한 사용자의 following 배열에 현재 사용자가 있는지 확인

  const text = following ? 'Unfollow' : 'Follow';
  
  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
      // router.refresh() : 데이터가 변경이 되었다면 router.refresh() 를 호출. 페이지 상에서 데이터가 변경이 되면 현재라우터가 refresh되면서 서버로 부터 업데이트된 정보를 반영해서 페이지를 새로운 정보로 업데이트
    });
  };
  return (
    <>
      {showButton && (
        <div className='relative'>
          {isUpdating && (
            <div className='absolute z-20 inset-0 flex justify-center items-center'>
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === 'Unfollow'}
          />
        </div>
      )}
    </>
  );
}
