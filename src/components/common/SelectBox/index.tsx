import React from 'react';
import styled from 'styled-components';

interface Option {
	value: string;
	name: string;
}

interface ISelectBoxProps {
	options: Option[];
	initialValue: string;
	onChange: (value: string) => void;
}

export default function SelectBox({ options, initialValue, onChange }: ISelectBoxProps) {
	return (
		<Select onChange={(e) => onChange(e.target.value)}>
			{options.map((option: Option) => (
				<option
					key={option.value}
					value={option.value}
					defaultValue={initialValue === option.value && initialValue}
				>
					{option.name}
				</option>
			))}
		</Select>
	);
}

const Select = styled.select`
	max-width: 100%;
	min-height: 1px;
	width: auto;
	padding: 3px 14px 3px 14px;
	background-color: transparent;
	:hover {
		border-color: #448ef7;
	}
	border: 1px solid rgba(128,128,128,0.5);
	border-radius: 6px;
`;
