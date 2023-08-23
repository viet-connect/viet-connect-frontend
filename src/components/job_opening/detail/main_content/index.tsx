import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import CommonUtils from '../../../../utils/commonUtils';

export default function MainContent({ data }) {
	const { t } = useTranslation();
	const {
		gender,
		proficiency,
		workingDay,
		isDayNegotiable,
		isTimeNegotiable,
		startingTime,
		endingTime,
		contents,
	} = data;

	const workDayArr = JSON.parse(workingDay);
	const convertedWorkDays = workDayArr.map((el) =>
		CommonUtils.DayConverter(el),
	);
	const workDayString = !isDayNegotiable
		? convertedWorkDays.join(', ')
		: convertedWorkDays.join(', ').concat(' (협의 가능)');

	return (
		<Container>
			<InfoWrapper style={{ marginBottom: 20 }}>
				<Title>{t('detail:recruitCondition')}</Title>
				<FirstContentWrapper>
					{/* <HeadCount>모집인원: 2명</HeadCount> */}
					<Gender>
						{t('detail:recruitmentGender')}:{' '}
						{CommonUtils.genderConverter(gender)}
					</Gender>
					<Proficiency>
						한국어 구사력: {CommonUtils.proficiencyConverter(proficiency)}
					</Proficiency>
				</FirstContentWrapper>
			</InfoWrapper>
			<InfoWrapper style={{ marginBottom: 20 }}>
				<Title>{t('detail:workingCondition')}</Title>
				<SecondContentWrapper>
					<WorkingDay>
						{t('detail:workingDay')}: 주 {workDayArr.length}일 - {workDayString}
					</WorkingDay>
					<WorkingHour>
						{t('detail:workingHour')}: {startingTime} ~ {endingTime}
						{isTimeNegotiable && '(협의 가능)'}
					</WorkingHour>
				</SecondContentWrapper>
			</InfoWrapper>
			<InfoWrapper>
				<Title>{t('detail:workInformation')}</Title>
				<DescriptionWrapper disabled>{contents}</DescriptionWrapper>
			</InfoWrapper>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 10px;
`;

const InfoWrapper = styled.div``;

const Title = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
`;

const FirstContentWrapper = styled.div`
	display: flex;
`;

const SecondContentWrapper = styled.div``;

const Gender = styled.div`
	margin-right: 30px;
`;

const Proficiency = styled.div``;

const WorkingDay = styled.div`
	margin-bottom: 10px;
`;

const WorkingHour = styled.div``;
const DescriptionWrapper = styled.textarea`
	border: 1px solid black;
	width: 100%;
	height: 150px;
	white-space: pre-wrap;
	font-size: 16px;
`;
