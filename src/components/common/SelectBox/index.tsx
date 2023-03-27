import React from 'react';
import styled from 'styled-components';

interface Option {
	value: string;
	name: string;
}

interface ISelectBoxProps {
	options: Option[];
	initialValue: string;
}

export default function SelectBox({ options, initialValue }: ISelectBoxProps) {
	return (
		<Select>
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
	width: 100%;
	padding: 3px 11px 3px 11px;
	background-color: transparent;
	:hover {
		border-color: lightblue;
	}
	border: 1px solid black;
`;
