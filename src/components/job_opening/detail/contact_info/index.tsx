import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import CommonUtils from '../../../../utils/commonUtils';

export default function JobDetailContactInfo({ data }) {
	const { t } = useTranslation();
	const { contactName, contactNumber } = data;

	return (
		<Container>
			<Title>{t('detail:companyInformation')}</Title>
			<ContactInfoContentWrapper>
				<Content style={{ marginBottom: 5 }}>
					{t('detail:companyName')}: {contactName}
				</Content>
				<Content>
					{t('detail:managerContact')}:{' '}
					{CommonUtils.addHyphenToPhoneNumber(contactNumber)}
				</Content>
			</ContactInfoContentWrapper>
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 40px;
`;

const Title = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
`;

const ContactInfoContentWrapper = styled.div``;
const Content = styled.div``;
