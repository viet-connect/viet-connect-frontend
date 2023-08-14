import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';

export default function TimePicker({
	value,
	defaultValue: _defaultValue,
	onChange,
}) {
	const pickerInput = useRef(null);
	const defaultValue = _defaultValue ?? dayjs(new Date());

	const onTimePickerChange = (timeInfo) => {
		const { $H, $m } = timeInfo;
		const hour = $H < 10 ? `0${$H}` : $H;
		const minute = $m < 10 ? `0${$m}` : $m;
		onChange(`${hour}:${minute}`);
	};

	useEffect(() => {
		pickerInput.current.readOnly = true;
	}, []);

	return (
		<Container>
			<DesktopTimePicker
				className="time-picker"
				value={value}
				defaultValue={defaultValue}
				views={['hours', 'minutes']}
				inputRef={pickerInput}
				viewRenderers={{
					hours: renderTimeViewClock,
					minutes: renderTimeViewClock,
					seconds: renderTimeViewClock,
				}}
				minutesStep={5}
				onChange={onTimePickerChange}
			/>
		</Container>
	);
}

const Container = styled.div`
	.time-picker {
		> div {
			padding: 16px;
		}
		input[type='text'] {
			border: none;
			padding: 0px;
		}
	}
`;
