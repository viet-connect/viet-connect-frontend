import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import BarLoader from 'react-spinners/BarLoader';

const loaderCss: CSSProperties = {
  position: 'absolute',
  display: 'block',
  width: '100%',
  margin: '0 auto',
  opacity: '0.5',
};

export default function CommonButton({
  wrapperStyle,
  extraWrapperStyle,
  children,
  label,
  onClick,
  className,
  textStyle,
  disabled,
  loading,
}: ICommonButtonProps) {
  const { width, height, color = 'blue' } = wrapperStyle ?? {};
  return (
    <ButtonWrapper
      width={width}
      height={height}
      color={color}
      style={{ ...extraWrapperStyle }}
      disabled={disabled || loading || false}
      onClick={onClick}
      className={className}
    >
      <ButtonText style={textStyle}>{label ?? children}</ButtonText>
      <BarLoader
        loading={loading ?? false}
        cssOverride={loaderCss}
        height={'100%'}
        color={'white'}
        speedMultiplier={0.8}
      />
    </ButtonWrapper>
  );
}

interface IButtonWrapperProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

interface ICommonButtonProps {
  wrapperStyle?: IButtonWrapperProps;
  extraWrapperStyle?: object;
  children?: React.ReactNode;
  label?: string;
  onClick?: Optional<(e) => void>;
  className?: string;
  textStyle?: object;
  disabled?: boolean;
  loading?: boolean;
}

const ButtonWrapper = styled.button<IButtonWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => {
    if (!width) return '100%';
    if (typeof width === 'string') return width;
    return `${width}px`;
  }};
  height: ${({ height }) => {
    if (!height) return '100%';
    if (typeof height === 'string') return height;
    return `${height}px`;
  }};
  border-radius: 6px;
  border: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background: ${(props) => props.color};
  cursor: ${({ disabled }) => (disabled ? 'normal' : 'pointer')};
`;

const ButtonText = styled.div`
  font-style: 'Noto Sans KR';
  font-size: 13px;
  font-weight: 700;
`;
