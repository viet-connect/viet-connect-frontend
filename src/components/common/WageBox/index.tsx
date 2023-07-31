import React from 'react';
import styled from 'styled-components';
import wageTermFunction from '../../../utils/wageConfig';

interface IWageBox {
	termIndex: number;
}

interface IContrainerProps {
	boxColor: string;
	boxFontColor: string;
	borderColor: string;
}

export default function WageBox({ termIndex }: IWageBox) {
	const { boxFontColor, boxColor, borderColor, value } =
		wageTermFunction(termIndex);

	return (
		<Container
			boxColor={boxColor}
			boxFontColor={boxFontColor}
			borderColor={borderColor}
		>
			{value}
		</Container>
	);
}

const Container = styled.div<IContrainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2px 4px;
	background: ${(props) => props.boxColor};
	border: 1px solid ${(props) => props.borderColor};
	border-radius: 4px;
	color: ${(props) => props.boxFontColor};
	font-size: 12px;
`;
