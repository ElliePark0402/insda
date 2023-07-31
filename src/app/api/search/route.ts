import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

//SSG로 행동하는 페이지를 force-dynamic 을 지정해 줌으로 서버사이드 랜더링으로 움직이게 해줌
export const dynamic = 'force-dynamic';

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
