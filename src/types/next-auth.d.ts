import NextAuth, { DefaultSession } from 'next-auth';
//customized 된 타입을 지정해줌. 타입정의파일

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       username: string;
//     } & DefaultSession['user']; // user 는 DefaultSession user 타입을 그대로 가져가면서 username 을 추가함.
//   }
// }

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}