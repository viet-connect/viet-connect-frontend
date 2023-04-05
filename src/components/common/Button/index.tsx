import React from 'react';
import styled from 'styled-components';

export default function CommonButton({
	wrapperStyle,
	extraWrapperStyle,
	children,
	onClick,
	className,
}: ICommonButtonProps) {
	const { width, height, color } = wrapperStyle;

	return (
		<ButtonWrapper
			width={width}
			height={height}
			color={color}
			style={{ ...extraWrapperStyle }}
			onClick={onClick}
			className={className}
		>
			<ButtonText>{children}</ButtonText>
		</ButtonWrapper>
	);
}

interface IButtonWrapperProps {
	width?: number;
	height: number;
	color: string;
}

interface ICommonButtonProps {
	wrapperStyle: IButtonWrapperProps;
	extraWrapperStyle?: object;
	children: React.ReactNode;
	onClick?: Optional<() => void>;
	className?: string;
}

const ButtonWrapper = styled.div<IButtonWrapperProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) => (props.width ? `${props.width}px` : '100%')};
	height: ${(props) => props.height}px;
	border-radius: 5px;
	background: ${(props) => props.color};
	cursor: pointer;
`;

const ButtonText = styled.div`
	font-style: 'Noto Sans KR';
	font-size: 13px;
	font-weight: 700;
`;
