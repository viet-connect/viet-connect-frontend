import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import styled from 'styled-components';
import CommonButton from '../common/Button';

export default function ErrorPage({ src = null, desc = 'test' }) {
	const [lottie, setLottie] = useState(null);
	const btnStyle = { width: 65, height: 30, color: '#EEAB6E' };
	const lottieStyle = { minWidth: 280, minHeight: 280, maxWidth: 500, maxHeight: 500 };

	useEffect(() => {
		const getLottie = async (lottueSrc: string) => {
			if (!lottueSrc) return null;
			const lottieJson = await import(`../../public/assets/lottie/${lottueSrc}`);
			setLottie(lottieJson);
			return true;
		};
		getLottie(src);
	}, []);

	const onClick = () => {
		window.history.back();
	};
	return (
		<Container>
			<Wrapper>
				<Main>
					<Content>
						<Lottie loop animationData={lottie} play style={lottieStyle}/>
						<div>{desc}</div>
					</Content>
					<CommonButton wrapperStyle={btnStyle} onClick={onClick}>돌아가기</CommonButton>
				</Main>
			</Wrapper>
		</Container>
	);
}

const Container = styled.div`
	height: 100%;
`;

const Wrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
