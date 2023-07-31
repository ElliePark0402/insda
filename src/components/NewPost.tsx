'use client';
import { AuthUser } from '@/model/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';
import PostUserAvatar from './PostUserAvatar';
import Button from './ui/Button';
import GridSpinner from './ui/GridSpinner';
import FilesIcon from './ui/icons/FilesIcon';

type Props = {
  user: AuthUser;
};
export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null); // 사용자가 text를 입력할때마다 내부 상태가 변경되어 발생하는 rerendering을 방지하기 위해 control component가 아니라 ref를 전달함.
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault(); // 파일을 드래그 했을때 파일을 자동으로 열러고 하는 기능을 없애줌
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files; // 드래그 했을때 드래그된 파일이 있는지 확인
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts', { method: 'POST', body: formData }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString())) 
      .finally(() => setLoading(false));
  };

  return (
    <section className='w-full max-w-xl flex flex-col items-center mt-6'>
      {loading && (
        <div className='absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20'>
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold'>
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image ?? ''} />
      <form className='w-full flex flex-col mt-2' onSubmit={handleSubmit}>
        <input
          className='hidden'
          name='input'
          id='input-upload'
          type='file'
          accept='image/*'
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && 'border-2 border-sky-500 border-dashed'
          }`}
          htmlFor='input-upload'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className='absolute inset-0 z-10 bg-sky-500/20 pointer-events-none' />
          )}
          {!file && (
            <div className='flex flex-col items-center pointer-events-none'> 
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className='relative w-full aspect-square'>
              <Image
                className='object-cover'
                src={URL.createObjectURL(file)} // 업로드 하는 이미지 미리보기
                alt='local file'
                fill
                sizes='650px'
              />
            </div>
          )}
        </label>
        <textarea
          className='outline-none text-lg border border-neutral-300'
          name='text'
          id='input-text'
          required
          rows={10}
          placeholder={'Write a caption...'}
          ref={textRef} // textRef와 노드 실제 참조값을 연결
        />
        <Button text='Publish' onClick={() => {}} />
      </form>
    </section>
  );
}
