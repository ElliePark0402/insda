import NewPost from '@/components/NewPost';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { // metadata 정의
  title: 'New Post',
  description: 'Create a new post',
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions); // 로그인 사용자여부 확인
  if (!session?.user) { // 세션안에 user가 있는지 없는지 검사
    redirect('/auth/signin');
  }
  return <NewPost user={session.user} />;
}

