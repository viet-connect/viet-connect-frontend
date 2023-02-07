import React from 'react';
import styled from 'styled-components';
import wageTermFunction from '../../../utils/wageConfig';

interface IWageBox {
	termIndex: number;
}

interface IContrainerProps {
	boxColor: string;
	boxFontColor: string;
}

export default function WageBox({ termIndex }: IWageBox) {
	const { boxFontColor, boxColor, value } = wageTermFunction(termIndex);

	return (
		<Container boxColor={boxColor} boxFontColor={boxFontColor}>
			{value}
		</Container>
	);
}

const Container = styled.div<IContrainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 25px;
	background: ${(props) => props.boxColor};
	border: 1.5px solid ${(props) => props.boxFontColor};
	color: ${(props) => props.boxFontColor};
`;
