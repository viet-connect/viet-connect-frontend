import React from 'react';
import styled from 'styled-components';
// import Image from 'next/image';
import { useRouter } from 'next/router';
// import logoImg from '../../../../public/assets/vietconnect-logo.png';
import SvgIcon from '../../../common/Icon';

export default function Logo() {
	const router = useRouter();

	return (
		<Container
			onClick={() => {
				router.push('/').then(() => router.reload());
			}}
		>
			<SvgIcon name="vietconnectLogo" width={131} height={38} />
		</Container>
	);
}

const Container = styled.div`
	cursor: pointer;
`;
