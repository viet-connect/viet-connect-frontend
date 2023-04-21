import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { inputPostingState } from '../../../recoil/atom/posting';

export default function TimePicker() {
	const [newJobPosting, setNewJobPosting] = useRecoilState(inputPostingState);
	const handleChangeTime = (e, type) => {
		setNewJobPosting({ ...newJobPosting, [type]: e.target.value });
	};

	return (
		<Container>
			<TimeInputWrapper style={{ marginRight: 20, width: 120 }}>
				<input
					type="time"
					value={newJobPosting.starting_time}
					step={3600}
					required
					onChange={(e) => handleChangeTime(e, 'starting_time')}
				/>
			</TimeInputWrapper>
			<Divider>~</Divider>
			<TimeInputWrapper style={{ marginLeft: 20, width: 120 }}>
				<input
					type="time"
					value={newJobPosting.ending_time}
					step={3600}
					required
					onChange={(e) => handleChangeTime(e, 'ending_time')}
				/>
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
