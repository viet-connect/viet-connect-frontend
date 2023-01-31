import React from 'react';
import { Row, Col, Menu, Divider, Typography } from 'antd';
import constant from '../../../../constant/constant';

const { Text } = Typography;

export default function FooterTop() {
	return (
		<Row
			style={{
				padding: '16px',
			}}
		>
			<Col>
				<Text>상호 : {constant.ENTERPRISE}</Text>
				<Divider type="vertical" />
				<Text>대표 : {constant.EXECUTIVE}</Text>
				<Divider type="vertical" />
				<Text strong>
					개인정보책임자 : {constant.PERSONAL_INFO_PERSON_IN_CHARGE}{' '}
				</Text>
				<Divider type="vertical" />
				<br />
				<Text>사업자등록번호 : {constant.ENTERPRISE_NUMBER} </Text>
				<Divider type="vertical" />
				<br />
				<Text>주소 : {constant.ADDRESS}</Text>
				<Divider type="vertical" />
				<br />
				<Text>대표이메일 : {constant.COMPANY_EMAIL}</Text>
				<Divider type="vertical" />
				<br />
				<Text>대표전화 : {constant.COMPANY_PHONE_NUMBER}</Text>
				<Divider type="vertical" />
			</Col>
		</Row>
	);
}
