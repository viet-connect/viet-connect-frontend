import React from 'react';
import styled from 'styled-components';
import SvgIcon from '../../../common/Icon';

export default function Flag() {
	return (
		<Container>
			<IconWrapper>
				<SvgIcon
					style={{ marginRight: 5 }}
					name="vietnamFlag"
					width={29}
					height={19}
				/>
			</IconWrapper>
			<IconWrapper>
				<SvgIcon name="koreanFlag" width={29} height={19} />
			</IconWrapper>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
`;
const IconWrapper = styled.div`
	cursor: pointer;
`;
