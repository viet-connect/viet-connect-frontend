import React, { useState } from 'react';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Menu1 from '../../common/Menu/HeaderMenu';

export default function HeaderMenu() {
	const [isClicked, setIsClicked] = useState(0);
	const router = useRouter();
	const items = [
		{ label: '채용공고', key: '/' },
		{ label: '채용공고등록', key: '/job_opening/posting' },
	];

	return (
		<Container>
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
			<Menu1 items={items} />
		</Container>
	);
}

const Container = styled.div``;
