import React from 'react';
import styled from 'styled-components';
import WageBox from '../../../common/WageBox';

export default function ContentHeader() {
	return (
		<Container>
			<InfoFirstLine>경성양꼬치 선릉점 사람모집</InfoFirstLine>
			<InfoSecondLine>
				<TimeWrapper>23-01-05 22:34</TimeWrapper>
				<WageWrapper>
					<WageBox termIndex={0} />
				</WageWrapper>
				<WageWrapper>2,000,000원</WageWrapper>
			</InfoSecondLine>
			<InfoThirdLine>서울특별시 강남구 삼성로85길 39</InfoThirdLine>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 30px;
`;

const InfoFirstLine = styled.div`
	font-weight: bold;
	font-size: 25px;
	margin-bottom: 5px;
`;

const InfoSecondLine = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 5px;
`;

const InfoThirdLine = styled.div``;
const TimeWrapper = styled.div`
	margin-right: 10px;
`;

const WageWrapper = styled.div`
	margin-right: 10px;
`;
