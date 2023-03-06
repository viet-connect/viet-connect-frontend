import React from 'react';
import styled from 'styled-components';

export default function TimePicker() {
	return (
		<Container>
			<TimeInputWrapper style={{ marginRight: 20, width: 120 }}>
				<input type="time" />
			</TimeInputWrapper>
			<Divider>~</Divider>
			<TimeInputWrapper style={{ marginLeft: 20, width: 120 }}>
				<input type="time" />
			</TimeInputWrapper>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const TimeInputWrapper = styled.div``;

const Divider = styled.div`
	font-weight: bold;
	font-size: 20px;
`;
