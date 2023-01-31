import React from 'react';
import { Row, Col } from 'antd';

export default function FooterBottom() {
	return (
		<Row justify="center">
			<Col
				style={{
					fontSize: '10px',
					color: '#c7c7c7',
				}}
			>
				COPYRIGHT © 비엣커넥트 All RIGHTS RESERVED.
			</Col>
		</Row>
	);
}
