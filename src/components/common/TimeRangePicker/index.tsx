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
			<TimeSelector>
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
			</TimeSelector>
			<Worklog>
				총 근무시간: {endHour - startHour}시간 {endMinute - startMinute}분
			</Worklog>
		</Container>
	);
}

const Container = styled.div``;

const Worklog = styled.div`
	font-size: 12px;
`;

const TimeSelector = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 2px;
`;

const Divider = styled.div`
	font-weight: bold;
	font-size: 20px;
`;
