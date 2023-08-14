import React from 'react';
import styled from 'styled-components';
import DateUtils from '../../../../utils/DateUtils';
import { wageTypeConverter } from '../../../../utils/wageConfig';
import WageBox from '../../../common/WageBox';

export default function ContentHeader({ data }) {
	const { title, updatedAt, wageType, wageAmount, address } = data;
	return (
		<Container>
			<InfoFirstLine>{title}</InfoFirstLine>
			<InfoSecondLine>
				{/* <TimeWrapper>{DateUtils.getDateHourMinString(updatedAt)}</TimeWrapper> */}
				<WageWrapper>
					<WageBox termIndex={wageTypeConverter(wageType)} />
				</WageWrapper>
				<WageWrapper>{wageAmount}원</WageWrapper>
			</InfoSecondLine>
			<InfoThirdLine>{address}</InfoThirdLine>
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
	justify-content: flex-start;
`;

const InfoThirdLine = styled.div``;
const TimeWrapper = styled.div`
	margin-right: 10px;
`;

const WageWrapper = styled.div`
	margin-right: 10px;
`;
