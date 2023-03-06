import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { postingConstant } from '../../../../constant/constant';
import Checkbox from '../../../common/CheckBox';
import TimePicker from '../../../common/TimePicker';
import {
	SubTitleWrapper,
	ItemTitle,
	PlaceHolder,
	PlaceHolderWrapper,
} from '../first_part';

export default function JobOpeningPostingThirdPart() {
	const { PostingThirdPartInfo } = postingConstant;
	const [isNegotiable, setIsNegotiable] = useState(false);

	return (
		<Container>
			<InputContainer>
				<TitleWrapper>
					<ItemTitle>급여</ItemTitle>
					<ItemTitleDesc>
						2023년 기준 최저임금은 시간급 기준 9,620원입니다
					</ItemTitleDesc>
				</TitleWrapper>
				<WageInputWrapper>
					<WageSelector>
						<option value="hourly">시급</option>
						<option value="monthly">월급</option>
						<option value="weekly">주급</option>
					</WageSelector>
					<PlaceHolderWrapper>
						<PlaceHolder style={{ marginLeft: 5 }} type="text" />
						<UnitWrapper>원</UnitWrapper>
					</PlaceHolderWrapper>
				</WageInputWrapper>
			</InputContainer>
			{Object.keys(PostingThirdPartInfo).map((el) => {
				const valArray = PostingThirdPartInfo[el];
				const title = valArray[valArray.length - 1];

				return (
					<SubTitleWrapper key={el}>
						<ItemTitle>{title}</ItemTitle>
						<BoxContainer>
							{valArray.map((val: string, index: number) => {
								if (index === valArray.length - 1) {
									return null;
								}

								return (
									<UnitBox boxIndex={index} key={val}>
										{val}
									</UnitBox>
								);
							})}
						</BoxContainer>
					</SubTitleWrapper>
				);
			})}
			<Checkbox checked={isNegotiable} onChange={setIsNegotiable}>
				<div style={{ paddingLeft: 10 }}>근무요일 협의가능</div>
			</Checkbox>
			<InputContainer>
				<ItemTitle>근무시간</ItemTitle>
				<TimePicker />
			</InputContainer>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 20px;
`;

const InputContainer = styled.div`
	margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
	display: flex;
	font-size: 18px;
	font-weight: bold;
	align-items: center;
`;

const ItemTitleDesc = styled.div`
	padding: 0 0 15px 10px;
	font-size: 13px;
	font-weight: bold;
`;

const WageInputWrapper = styled.div`
	display: flex;
	align-items: flex-end;
`;

const WageSelector = styled.select`
	width: 120px;
	margin-right: 10px;
`;

const UnitWrapper = styled.div`
	margin-left: 5px;
	font-size: 18px;
	font-weight: bold;
`;

const BoxContainer = styled.div`
	display: flex;
	border: 1px solid black;
`;

interface IUnitBoxProps {
	boxIndex: number;
}

const UnitBox = styled.div<IUnitBoxProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	font-size: 15px;
	font-weight: bold;
	height: 50px;
	${(props) =>
		props.boxIndex > 0 &&
		css`
			border-left: 1px solid black;
		`}

	cursor: pointer;
`;
