import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

export default function Menu({ items }: MenuProps) {
	const router = useRouter();
	const [isClicked, setIsClicked] = useState(0);

	return (
		<Container>
			{items.map((item: MenuItemProps, index: number) => (
				<MenuItem
					key={item.key}
					id={`${index}`}
					onClick={() => setIsClicked(index)}
				>
					<MenuItemContent index={index} clickedItem={isClicked}>
						{item.label}
					</MenuItemContent>
				</MenuItem>
			))}
		</Container>
	);
}

interface MenuItemProps {
	label: string;
	key: string;
}

interface MenuItemContentProps {
	clickedItem: number;
	index: number;
}

interface MenuProps {
	items: Array<MenuItemProps>;
}

const Container = styled.ul`
	display: flex;
	justify-content: flex-start;
	border-bottom: 1px solid rgba(5, 5, 5, 0.06);
	line-height: 46px;
	font-size: 14px;
	list-style: none;
	padding-inline-start: 0;
`;

const MenuItem = styled.li`
	padding-inline: 16px;
	cursor: pointer;
`;

const MenuItemContent = styled.div<MenuItemContentProps>`
	color: #1677ff;
	font-weight: bold;
	border-bottom: ${({ clickedItem, index }) =>
		clickedItem === index ? ' 2px solid #1677ff;' : 0};
`;
