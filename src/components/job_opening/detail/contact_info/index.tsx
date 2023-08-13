import React from 'react';
import styled from 'styled-components';
import CommonUtils from '../../../../utils/commonUtils';

export default function JobDetailContactInfo({ data }) {
	const { contactName, contactNumber } = data;

	return (
		<Container>
			<Title>회사정보</Title>
			<ContactInfoContentWrapper>
				<Content style={{ marginBottom: 5 }}>업체명: {contactName}</Content>
				<Content>
					담당자 연락처: {CommonUtils.addHyphenToPhoneNumber(contactNumber)}
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
