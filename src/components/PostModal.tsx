import CloseIcon from './ui/icons/CloseIncon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};
export default function PostModal({ onClose, children }: Props) { // onClose 창을 끄는것을 클릭시 끄는함수
  return (
    <section
      className='fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70'
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
          // 포스트 밖의 영역클릭시 창 닫음. 안에 있는 자식 노드가 아니라 외부에section 태그를 클릭했다는 의미임
        }
      }}
    >
      <button
        className='fixed top-0 right-0 p-8 text-white'
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className='bg-white w-4/5 h-3/5 max-w-7xl'>{children}</div>
    </section>
  );
}
