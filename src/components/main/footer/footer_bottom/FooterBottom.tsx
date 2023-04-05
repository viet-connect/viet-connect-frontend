import React from 'react';
import styled from 'styled-components';

export default function FooterBottom() {
	return (
		<Container>
			<FooterBottomText>
				COPYRIGHT © 비엣커넥트 All RIGHTS RESERVED.
			</FooterBottomText>
		</Container>
	);
}

const Container = styled.div`
	padding-left: 10px;
`;

const FooterBottomText = styled.div`
	font-size: 12px;
	color: #c7c7c7;
`;
