'use client';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) { 
    //전달받은 children(application) 을 감싸는 <SessionProvider> 라는 우산
  return <SessionProvider>{children}</SessionProvider>;
}
// 실제 로그인시 제공되는 정보는 SessionProvider 안에 있고 , AuthContext 라는 우산으로 한번더 감싸줌.