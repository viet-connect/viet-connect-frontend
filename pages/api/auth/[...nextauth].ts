/* eslint-disable no-param-reassign */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { ISODateString, NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from '../../../src/lib/prisma';

interface DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
}

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
        };
      }
      return token;
    },

    async session({ session, user, token }) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: 'auth/verify-request',
  },
  adapter: PrismaAdapter(prisma),
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  NextAuth(req, res, authOptions);
};

export default Auth;
