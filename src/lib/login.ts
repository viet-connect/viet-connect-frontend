import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function useLogin() {
	const { data: session, status } = useSession();

	const logOut = async () => {
		await axios.get('/api/auth/signout');
		await signOut({ redirect: true });
	};

	return {
		login: signIn,
		logOut,
		userProfile: { ...session?.user } || {},
		isLogin: status === 'authenticated',
	};
}
