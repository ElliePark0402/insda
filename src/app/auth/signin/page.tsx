import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Signin from '@/components/Signin';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or Login to Insda',
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignPage({ // 서버사이트 컴포넌트
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions); //authOptions 정보를 가져와서 session에 저장  getServerSession-> 라이브러리에서 제공하는 함수

  if (session) {
    redirect('/');
  }
  // 세션이 없다면 providers로 가져오기.
  const providers = (await getProviders()) ?? {}; // null 을 반환시 기본 record(텅텅빈) {} 를 사용
  
  
  return (
    // providers로 매핑하면서 실제 로그인 할수 있는 버튼으로 만들어줌. (구글 로그인, 카카오 로그인, 깃허브로그인 등)
    // 사용자에게 버튼을 보여주고 클릭까지 처리를 하려면 client side 로 진행해야 함.
    <section className='flex justify-center mt-24'>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} /> 
      {/* 클라이언트 컴포넌트. 로그인 버튼 박스 컴 */}
    </section>
  );
}