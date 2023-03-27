import React from 'react';
import styled from 'styled-components';

export default function CommonButton({
	wrapperStyle,
	extraWrapperStyle,
	children,
}: ICommonButtonProps) {
	const { width, height, color } = wrapperStyle;

	return (
		<ButtonWrapper
			width={width}
			height={height}
			color={color}
			style={{ ...extraWrapperStyle }}
		>
			<ButtonText>{children}</ButtonText>
		</ButtonWrapper>
	);
}

interface IButtonWrapperProps {
	width: number;
	height: number;
	color: string;
}

interface ICommonButtonProps {
	wrapperStyle: IButtonWrapperProps;
	extraWrapperStyle?: object;
	children: React.ReactNode;
}

const ButtonWrapper = styled.div<IButtonWrapperProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	border-radius: 10px;
	background: ${(props) => props.color};
	cursor: pointer;
`;

const ButtonText = styled.div`
	font-style: 'Noto Sans KR';
	font-size: 13px;
	font-weight: 700;
`;
