import { addUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//const handler = NextAuth({
  const authOptions : NextAuthOptions = {
// Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'null',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'null',
    }),
    // can add more providers here
  ],
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email) { 
        return false;
      }
      addUser({
        id,
        name: name || '',
        image,
        email,
        username: email.split('@')[0],
      });
      return true;
    },
    async session({ session, token  }) {
      //console.log(session);
      const user = session?.user; // 구글 로그인시 user정보를 저장
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '', // username을 이메일 앞부분으로 지정하여 저장
          //username 의 타입을 src/types/next-auth.d.ts 안에 customized 된 타입을 지정해줌.
          id: token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },


  pages: { //Customized 로그인 페이지 구현
    signIn: '/auth/signin',
  }, // 
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };