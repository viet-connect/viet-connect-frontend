import { useSession, signIn, signOut } from 'next-auth/react';
import styled from 'styled-components';

export default function LoginButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<Container>
				<LoginSign>{session.user?.name}님 반갑습니다!</LoginSign>
				<LogOutWrapper onClick={() => signOut()}>로그아웃하기</LogOutWrapper>
			</Container>
		);
	}
	return (
		<Container>
			<LoginWrapper onClick={() => signIn()}>카카오로 로그인</LoginWrapper>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const LoginWrapper = styled.div`
	cursor: pointer;
	background-color: yellow;
	padding: 1px;
`;

const LoginSign = styled.div`
	padding-right: 5px;
`;

const LogOutWrapper = styled.div`
	cursor: pointer;
	padding: 1px;
	background-color: yellow;
`;
