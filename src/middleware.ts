import { log } from 'console';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// page 및 API 모두 확인 가능
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  
  if (!token) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = { // 아래 경로로 들어오는 경우 middleware를 먼저 실행해줌
  matcher: [
    '/new',
    '/',
    '/api/bookmarks',
    '/api/comments',
    '/api/likes',
    '/api/follow',
    '/api/me',
    '/api/posts/:path*',
  ],
};
