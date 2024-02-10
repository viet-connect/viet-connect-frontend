/* eslint-disable no-param-reassign */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { JWT } from 'next-auth/jwt';
import axios from 'axios';
import log from 'logging-service';
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
	// logger: {
	// 	error(code, metadata) {
	// 		log.error(code, metadata);
	// 	},
	// },
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
	NextAuth(req, res, authOptions);
};

async function refreshAccessToken(token: JWT) {
	try {
		const server =
			process.env.NODE_ENV === 'development'
				? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
				: process.env.DEPLOY_URL;
		const url = `${server}/api/auth/refreshToken`;

		const params = {
			grant_type: 'refresh_token',
			refresh_token: token.refreshToken,
		};

		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
		};

		const res = await axios.post(url, null, {
			headers,
			params,
			auth: {
				username: process.env.CLIENT_ID as string,
				password: process.env.CLIENT_SECRET as string,
			},
		});

		const refreshedTokens = await res.data;

		if (res.status !== 200) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires:
				Math.round(Date.now() / 1000) + refreshedTokens.expires_in,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
		};
	} catch (err) {
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
}
export default Auth;
