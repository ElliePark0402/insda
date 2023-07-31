import { addBookmark, removeBookmark } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {

  return withSessionUser(async (user) => { // callback함수 == (user) => Promise<Response>
    const { id, bookmark } = await req.json();

    if (!id || bookmark == null) { //bookmark == null 불리언타입이므로 ! 없는경우 null혹은 undefinded 체크하여 검사해 주어야 함.
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, id) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
