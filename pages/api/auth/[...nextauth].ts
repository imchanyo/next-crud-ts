import { connectDB } from "@/util/database";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
 
export const authOptions  = {
  providers: [
    GithubProvider({
      clientId: "f7c50dea4ac132207b93",
      clientSecret: "d62db25357b92889510d986becf8347a79aaeb51",
    }),
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials :  Record<"email" | "password", string> | undefined) {
        let db = (await connectDB).db("forum");
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials?.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        if(!credentials) return
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user } : {token : any, user : any}) => {
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token } : { session : any, token : any}) => {
      session.user.name = token.name;
      session.user.email = token.email;
      console.log(61, session.user)
      return session.user;
    },
  },
  adapter: MongoDBAdapter(connectDB),
  secret: "1234",
};
export default NextAuth(authOptions);