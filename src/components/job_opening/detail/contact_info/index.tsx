import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import CommonUtils from '../../../../utils/commonUtils';
import Map from '../../../common/Map';

export default function JobDetailContactInfo({ data }) {
	const { t } = useTranslation();
	const { contactName, contactNumber } = data;

	return (
		<Container>
			<Title>{t('detail:companyInformation')}</Title>
			<ContactInfoContentWrapper>
				<Content>
					{t('detail:companyName')}: {contactName}
				</Content>
				<Content>
					{t('detail:managerContact')}:{' '}
					{CommonUtils.addHyphenToPhoneNumber(contactNumber)}
				</Content>
			</ContactInfoContentWrapper>
			<Map location={data.geoLocation}/>
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
const Content = styled.div``;
