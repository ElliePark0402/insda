import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = { params: { username: string } }; // 객체안에 params가 있고 그안에 username은 string

const getUser = cache(async (username: string) => getUserForProfile(username));
// 여러번 DB에 요청하는 것이 아니라 동일한 사용자에 한해 한번만 호출후 이후에는 캐쉬된 자료를 사용

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className='w-full'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

// SEO 작성 for slug (다이나믹 라우트) 작성
export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username); // 사용자의 정보를 가져옴
  return {
    title: `${user?.name} (@${user?.username}) · Insda Photos`,
    description: `${user?.name}'s all Insda posts`,
  };
}
