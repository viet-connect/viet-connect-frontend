import React from 'react';
import styled from 'styled-components';

export default function JobDetailContactInfo({ data }) {
	const { author, contactName, contactNumber } = data;
	return (
		<Container>
			<Title>회사정보</Title>
			<ContactInfoContentWrapper>
				<Content style={{ marginBottom: 5 }}>업체명: {contactName}</Content>
				<Content style={{ marginBottom: 5 }}>작성자명: {author}</Content>
				<Content>담당자: {contactNumber}</Content>
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
