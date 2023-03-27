import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logoImg from '../../../../../public/assets/vietconnect-logo.png';

export default function Logo() {
	return (
		<Container>
			<Image src={logoImg} alt="vietconnect-logo" width={120} height={30} />
		</Container>
	);
}

const Container = styled.div``;
