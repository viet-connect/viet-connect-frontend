import React from 'react';
import styled from 'styled-components';

export default function JobDetailMap() {
	return (
		<Container>
			<Title>근무지역</Title>
			<MapWrapper></MapWrapper>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 40px;
`;

const Title = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
`;

const MapWrapper = styled.div`
	width: 100%;
	height: 140px;
	background-color: #e5ecd6;
`;
