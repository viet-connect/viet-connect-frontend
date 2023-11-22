import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
	providers: [
		KakaoProvider({
			clientId: process.env.KAKAO_CLIENT_ID!,
			clientSecret: process.env.KAKAO_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},

		async session({ session, token }) {
			// eslint-disable-next-line no-param-reassign
			session.user = token as any;
			return session;
		},
	},
	pages: {
		signIn: '/auth/signin',
	},
});
