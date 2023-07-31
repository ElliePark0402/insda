'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from './ui/ColorButton';

type Props = {
  providers: Record<string, ClientSafeProvider>; // key는 string, value는 ClientSafeProvider 타입
              // 타입스크립트에서 Record는 map과 유사
  callbackUrl: string;
};
export default function Signin({ providers, callbackUrl }: Props) {
      //providers 를 전달받아 화면에 버튼으로 보여줌
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={id}
          text={`Sign In with ${name}`}
          onClick={() => signIn(id, { callbackUrl })} //callbackUrl : singIn 버튼 클릭스 머물렀던 페이지url / 옵션 형태로 전달{}
          size='big'
        />
      ))}
    </>
  );
}
