'use client';

import Link from 'next/link';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import HomeIcon from './ui/icons/HomeIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import NewIcon from './ui/icons/NewIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import { usePathname } from 'next/navigation';
import ColorButton from './ui/ColorButton';
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from './Avatar';
//import Avatar from './Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];
export default function Navbar() {
  const pathName = usePathname(); // 현재 url을 확인할 수 있는 훅. 쿼리스트링 값은 제외하고 가져온다.
  const { data: session } = useSession();
  const user = session?.user; //session이 있다면 user정보를 할당해줌

  return (
    <div className='flex justify-between items-center px-6'>
      <Link href='/'>
        <h1 className='text-3xl font-bold'>INSDA</h1>
      </Link>
      <nav>
        <ul className='flex gap-4 items-center p-4'>
          {menu.map((item) => ( // 선택된 아이콘에 따라 아이콘이 달라짐
            <li key={item.href}>
              <Link href={item.href}>{pathName === item.href ? item.clickedIcon : item.icon}</Link>
            </li>
          ))}
          {user && (
            <li><Link href={`/user/${user.username}`}><Avatar image={user.image} size='small' highlight/></Link></li>
          )}
          <li>
            {session ? (
              <ColorButton text='Sign out' onClick={() => signOut()} /> //session 이 있으면 Sign out 버튼
            ) : (
              <ColorButton text='Sign in' onClick={() => signIn()} /> ////session 이 없으면 Sign in 버튼
            )}
          </li>
        </ul>
        {/* <Link href='/'> {pathName === '/' ? <HomeFillIcon /> : <HomeIcon />}</Link>
        <Link href='/search'> {pathName === '/search' ?  <SearchFillIcon /> : <SearchIcon />}</Link>
        <Link href='/new'> {pathName === '/new' ? <NewFillIcon /> : <NewIcon />}</Link> */}
      </nav>
    </div>
  );
}
