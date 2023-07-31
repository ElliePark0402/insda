import UserSearch from '@/components/UserSearch';
import { Metadata } from 'next';

//SSG로 행동하는 페이지를 force-dynamic 을 지정해 줌으로 서버사이드 랜더링으로 움직이게 해줌
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search users to follow',
};

export default function SearchPage() {
  return <UserSearch />;
}

