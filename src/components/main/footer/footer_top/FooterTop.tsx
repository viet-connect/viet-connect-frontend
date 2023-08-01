import React from 'react';
import styled, { css } from 'styled-components';
import { layoutConstant } from '../../../../constant/constant';

export default function FooterTop() {
	return (
		<Container>
			<FooterTopText>상호 : {layoutConstant.ENTERPRISE}</FooterTopText>
			<Divider />
			<FooterTopText>대표 : {layoutConstant.EXECUTIVE}</FooterTopText>
			<Divider />
			<FooterTopText>
				개인정보책임자 : {layoutConstant.PERSONAL_INFO_PERSON_IN_CHARGE}
			</FooterTopText>
			<Divider />
			{/* <br />
			<FooterTopText>
				사업자등록번호 : {layoutConstant.ENTERPRISE_NUMBER}
			</FooterTopText>
			<Divider />
			<br />
			<FooterTopText>주소 : {layoutConstant.ADDRESS}</FooterTopText>
			<Divider /> */}
			<br />
			<FooterTopText>대표이메일 : {layoutConstant.COMPANY_EMAIL}</FooterTopText>
			<Divider />
			<br />
			<FooterTopText>
				대표전화 : {layoutConstant.COMPANY_PHONE_NUMBER}
			</FooterTopText>
			<Divider />
		</Container>
	);
}

const Container = styled.div`
	padding: 10px;
`;

const FooterTopText = styled.span`
	font-size: 12px;
	vertical-align: middle;
	color: #1b1b1b;
`;

const Divider = styled.span`
	display: inline-block;
	width: 1px;
	height: 0.7em;
	background-color: #e9d7d75c;
	margin: 0 10px;
	vertical-align: baseline;
`;
