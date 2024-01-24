import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from '../../../src/lib/prisma';

export const authOptions: NextAuthOptions = {
	providers: [
		KakaoProvider({
			clientId: process.env.KAKAO_CLIENT_ID!,
			clientSecret: process.env.KAKAO_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			console.log(1);
			return { ...token, ...user };
		},

		async session({ session, token, user }) {
			// eslint-disable-next-line no-param-reassign
			session.user = { ...user, ...token };
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
