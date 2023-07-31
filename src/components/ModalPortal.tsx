import reactDom from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  if (typeof window === 'undefined') { 
    return null;
    // 서버사이드 랜더링시에는 처리하지 않음. window 환경이 undefined 이라면(브라우저환경이 아니라면) null을 리턴
  }

  const node = document.getElementById('portal') as Element;
  // id가 portal 인것을 Element 타입으로 가져옴.
  return reactDom.createPortal(children, node);
}
