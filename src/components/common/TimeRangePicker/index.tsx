import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { inputPostingState } from '../../../recoil/atom/posting';
import TimePicker from '../TimePicker';

export default function TimeRangePicker() {
	const [newJobPosting, setNewJobPosting] = useRecoilState(inputPostingState);
	const handleChangeTime = (value, type) => {
		setNewJobPosting({ ...newJobPosting, [type]: value });
	};

	const { starting_time, ending_time } = newJobPosting;
	const [startHour, startMinute] = starting_time
		.split(':')
		.map((time) => Number(time));
	const [endHour, endMinute] = ending_time
		.split(':')
		.map((time) => Number(time));

	return (
		<Container>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<TimePicker
					value={dayjs().hour(startHour).minute(startMinute)}
					defaultValue={dayjs().hour(9).minute(0)}
					onChange={(e) => handleChangeTime(e, 'starting_time')}
				/>
				<Divider>~</Divider>
				<TimePicker
					value={dayjs().hour(endHour).minute(endMinute)}
					defaultValue={dayjs().hour(18).minute(0)}
					onChange={(e) => handleChangeTime(e, 'ending_time')}
				/>
			</LocalizationProvider>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const Divider = styled.div`
	font-weight: bold;
	font-size: 20px;
`;
