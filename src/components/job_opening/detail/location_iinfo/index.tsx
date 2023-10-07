import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Map from '../../../common/Map';

export default function LocationInfo({ data }) {
	const { t } = useTranslation();
	const { address, geoLocation, contactName } = data;
	return (
		<Container>
			<Title>{t('detail:locationInformation')}</Title>
			<ContactInfoContentWrapper>
				<div>{address}</div>
				<Map contactName={contactName} location={geoLocation}/>
			</ContactInfoContentWrapper>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 40px;
`;

const Title = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const ContactInfoContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
