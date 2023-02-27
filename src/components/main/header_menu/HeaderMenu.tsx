import React, { useState } from 'react';
import { Row, Col, Menu } from 'antd';
import { useRouter } from 'next/router';

export default function HeaderMenu() {
	const [isClicked, setIsClicked] = useState(0);
	const router = useRouter();
	const items = [
		{ label: '채용공고', key: '/' },
		{ label: '채용공고등록', key: '/job_opening/posting', disabled: false },
	];

	return (
		<Row>
			<Col span={24}>
				<Menu
					items={items}
					mode="horizontal"
					selectedKeys={items.map((e) => e.key)}
					onClick={(e) => {
						router.push(e.key);

						if (isClicked === 0) {
							setIsClicked(1);
						} else {
							setIsClicked(0);
						}
					}}
					style={{ fontWeight: 'bold' }}
				/>
			</Col>
		</Row>
	);
}
