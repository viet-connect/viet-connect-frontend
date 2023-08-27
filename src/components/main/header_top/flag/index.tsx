import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SvgIcon from '../../../common/Icon';

export default function Flag() {
	const router = useRouter();
	return (
		<Container>
			<Link href={router.asPath} locale="vn">
				<SvgIcon
					style={{ marginRight: 5 }}
					name="vietnamFlag"
					width={29}
					height={19}
				/>
			</Link>
			<Link href={router.asPath} locale="ko">
				<SvgIcon name="koreanFlag" width={29} height={19} />
			</Link>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
`;
const IconWrapper = styled.div`
	cursor: pointer;
`;
