import React from 'react';
import styled from 'styled-components';
import CommonUtils from '../../../../utils/commonUtils';

export default function MainContent({ data }) {
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
			<InfoWrapper style={{ marginBottom: 30 }}>
				<Title>모집조건</Title>
				<FirstContentWrapper>
					{/* <HeadCount>모집인원: 2명</HeadCount> */}
					<Gender>모집성별: {CommonUtils.genderConverter(gender)}</Gender>
					<Proficiency>
						한국어 구사력: {CommonUtils.proficiencyConverter(proficiency)}
					</Proficiency>
				</FirstContentWrapper>
			</InfoWrapper>
			<InfoWrapper style={{ marginBottom: 30 }}>
				<Title>근무조건</Title>
				<SecondContentWrapper>
					<WorkingDay>
						근무요일: 주 {workDayArr.length}일 - {workDayString}
					</WorkingDay>
					<WorkingHour>
						근무시간: {startingTime} ~ {endingTime}
						{isTimeNegotiable && '(협의 가능)'}
					</WorkingHour>
				</SecondContentWrapper>
			</InfoWrapper>
			<InfoWrapper>
				<Title>상세정보</Title>
				<DescriptionWrapper>{contents}</DescriptionWrapper>
			</InfoWrapper>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 40px;
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

const HeadCount = styled.div`
	margin-right: 30px;
`;

const Gender = styled.div`
	margin-right: 30px;
`;

const Proficiency = styled.div``;

const WorkingDay = styled.div`
	margin-bottom: 10px;
`;

const WorkingHour = styled.div``;
const DescriptionWrapper = styled.div`
	border: 1px solid black;
	width: 100%;
	height: 100px;
	white-space: pre;
`;
