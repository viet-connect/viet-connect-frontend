import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { postingConstant } from '../../../../constant/constant';
import { inputPostingState } from '../../../../recoil/atom/posting';
import CommonUtils from '../../../../utils/commonUtils';
import Checkbox from '../../../common/CheckBox';
import TimeRangePicker from '../../../common/TimeRangePicker';
import {
	SubTitleWrapper,
	ItemTitle,
	PlaceHolder,
	PlaceHolderWrapper,
} from '../first_part';

/*
	wage_type: 0,
	wage_amount: 0,
	gender: 0,
	proficiency: 0,
	working_day: [0],
	is_day_negotiable: true,
	starting_time: 0,
	ending_time: 0,
	is_time_negotiable: 0,
*/

export default function JobOpeningPostingThirdPart({ data }) {
	const { PostingThirdPartInfo } = postingConstant;
	const [newJobPosting, setNewJobPosting] = useRecoilState(inputPostingState);
	const { t } = useTranslation();
	const handleInputChange = (e) => {
		const inputValue =
			e.target.name === 'wage_amount'
				? CommonUtils.addCommaToNumber(
						CommonUtils.decodeCommaInNumber(e.target.value),
				  )
				: e.target.value;

		setNewJobPosting({ ...newJobPosting, [e.target.name]: inputValue });
	};

	const handleClickUnitBox = (
		item: string,
		index: number,
		outerIndex: number,
	) => {
		let temp = null;
		if (outerIndex === 2) {
			const workingDayArray = [...newJobPosting.working_day];
			const indexIfExist = workingDayArray.indexOf(index);
			if (indexIfExist !== -1) {
				workingDayArray.splice(indexIfExist, 1);
			} else {
				workingDayArray.push(index);
			}

			temp = { ...newJobPosting, working_day: workingDayArray };
		} else {
			temp =
				newJobPosting[item] === index
					? { ...newJobPosting, [item]: null }
					: { ...newJobPosting, [item]: index };
		}

		setNewJobPosting(temp);
	};

	return (
		<Container>
			<InputContainer>
				<TitleWrapper>
					<ItemTitle>{t('posting:pay')}</ItemTitle>
					<ItemTitleDesc>{t('posting:payDescription')}</ItemTitleDesc>
				</TitleWrapper>
				<WageInputWrapper>
					<WageSelector
						name="wage_type"
						value={newJobPosting.wage_type}
						onChange={handleInputChange}
					>
						<option value="monthly">{t('jobTable:salary')}</option>
						<option value="weekly">{t('jobTable:weeklyWage')}</option>
						<option value="daily">{t('jobTable:dailyWage')}</option>
						<option value="hourly">{t('jobTable:hourlyWage')}</option>
					</WageSelector>
					<PlaceHolderWrapper>
						<PlaceHolder
							style={{ marginLeft: 5 }}
							type="text"
							name="wage_amount"
							value={newJobPosting.wage_amount}
							onChange={handleInputChange}
							maxLength={10}
						/>
						<UnitWrapper>원</UnitWrapper>
					</PlaceHolderWrapper>
				</WageInputWrapper>
			</InputContainer>
			{Object.keys(PostingThirdPartInfo).map((item, outerIndex) => {
				const valArray = PostingThirdPartInfo[item];
				const itemTitle = valArray[valArray.length - 1];

				return (
					<SubTitleWrapper key={item}>
						<ItemTitle>{t(`posting:${itemTitle}`)}</ItemTitle>
						<BoxContainer>
							{valArray.map((val: string, index: number) => {
								if (index === valArray.length - 1) {
									return null;
								}

								let selected = false;
								if (outerIndex === 2) {
									selected = newJobPosting[item].includes(index);
								} else {
									selected = newJobPosting[item] === index;
								}

								return (
									<UnitBox
										selected={selected}
										$boxIndex={index}
										key={val}
										onClick={() => handleClickUnitBox(item, index, outerIndex)}
									>
										{t(`posting:${val}`)}
									</UnitBox>
								);
							})}
						</BoxContainer>
					</SubTitleWrapper>
				);
			})}
			<Checkbox
				checked={newJobPosting.is_day_negotiable}
				onChange={(e) =>
					setNewJobPosting({ ...newJobPosting, is_day_negotiable: e })
				}
			>
				<div style={{ paddingLeft: 10 }}>
					{t('posting:workingdayNegotiable')}
				</div>
			</Checkbox>
			<InputContainer>
				<ItemTitle>{t('posting:workingHours')}</ItemTitle>
				<TimeRangePicker />
			</InputContainer>
			<Checkbox
				checked={newJobPosting.is_time_negotiable}
				onChange={(e) =>
					setNewJobPosting({ ...newJobPosting, is_time_negotiable: e })
				}
			>
				<div style={{ paddingLeft: 10 }}>
					{t('posting:workingHoursNegotiable')}
				</div>
			</Checkbox>
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
	$boxIndex: number;
	selected: Boolean;
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
		props.selected &&
		css`
			background: #eb6d0d;
		`}

	${({ $boxIndex }) =>
		$boxIndex > 0 &&
		css`
			border-left: 1px solid black;
		`}

	cursor: pointer;
`;
