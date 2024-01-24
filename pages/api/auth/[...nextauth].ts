/* eslint-disable no-param-reassign */
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
		async jwt({ token, account, user }) {
			console.log(token, account, user);
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
			console.log(session, user, token);
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
	session: { strategy: 'jwt' },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
	NextAuth(req, res, authOptions);
};

export default Auth;
