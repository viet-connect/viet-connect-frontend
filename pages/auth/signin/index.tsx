import { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import styled from 'styled-components';
import SvgIcon from '../../../src/components/common/Icon';
import Logo from '../../../src/components/main/header_top/logo';

function Login() {
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		(async () => {
			const res: any = await getProviders();
			setProviders(res);
		})();
	}, []);

	const handleKakao = async () => {
		const result = await signIn('kakao', {
			redirect: true,
			callbackUrl: '/',
		});
	};

	return (
		<Container>
			<div>
				<Logo />
			</div>
			<div style={{ paddingTop: 50, cursor: 'pointer' }}>
				<SvgIcon onClick={handleKakao} name="kakaoLoginButton" />
			</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

export default Login;
