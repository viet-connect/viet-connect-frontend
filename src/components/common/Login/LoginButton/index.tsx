import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				{session.user?.name}으로 로그인 되어있음 <br />
				<button onClick={() => signOut()}>로그아웃</button>
			</>
		);
	}
	return (
		<>
			로그인 되어있지 않음 <br />
			<button onClick={() => signIn()}>카카오로 로그인</button>
		</>
	);
}
