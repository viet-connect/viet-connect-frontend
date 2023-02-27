import React from 'react';
import styled, { css } from 'styled-components';
import { postingConstant } from '../../../../constant/constant';
import { ItemTitle } from '../first_part';

export default function JobOpeningPostingSecondPart() {
	const { PostingSecondPartInfo } = postingConstant;

	return (
		<Container>
			<FieldWrapper>
				<ItemTitle>모집분야</ItemTitle>
				<FieldWrapper>
					{PostingSecondPartInfo.map((el: Array<string>, idx: number) => (
						<RowContainer key={el[0]}>
							<FieldBoxWrapper rowIdx={idx} colIdx={0}>
								{el[0]}
							</FieldBoxWrapper>
							<FieldBoxWrapper rowIdx={idx} colIdx={1}>
								{el[1]}
							</FieldBoxWrapper>
						</RowContainer>
					))}
				</FieldWrapper>
				<WageInputWrapper>
					<WageInput />
				</WageInputWrapper>
			</FieldWrapper>
		</Container>
	);
}

interface FieldBoxWrapperProps {
	rowIdx: number;
	colIdx: number;
}

export const RowContainer = styled.div`
	display: flex;
	width: 50%;
`;

const FieldBoxWrapper = styled.div<FieldBoxWrapperProps>`
	width: 100%;
	height: 26px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid black;
	font-weight: bold;
	${(props) => {
		const { rowIdx, colIdx } = props;

		if (colIdx === 0) {
			if (rowIdx > 0) {
				return css`
					border-top: 0;
				`;
			}
		} else {
			let baseCss = css`
				border-left: 0;
			`;

			if (rowIdx > 0) {
				baseCss = css`
					border-left: 0;
					border-top: 0;
				`;
			}
			return baseCss;
		}

		return null;
	}}
`;

const Container = styled.div`
	width: 50%;
`;

const FieldWrapper = styled.div`
	margin-bottom: 30px;
`;

const WageInputWrapper = styled.div``;

const WageInput = styled.input.attrs({
	placeholder: '직접 입력하실 경우 여기에 작성해주세요',
})`
	width: 100%;
`;
