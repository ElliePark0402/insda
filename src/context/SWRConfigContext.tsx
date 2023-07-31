'use client';

import { SWRConfig } from 'swr';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        // string 타입의 url을 받아오면 브라우져에서 제공해주는 fetch API를 전달받은 url로 사용, 성공시 json으로 변환하여 응답
      }}
    >
      {children}
    </SWRConfig>
  );
}
