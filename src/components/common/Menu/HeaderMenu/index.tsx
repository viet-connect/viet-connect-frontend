import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import items from '../../../../constant/path';

export default function Menu({ pageIndex }: HeaderMenuProps) {
	const { t } = useTranslation();
	const router = useRouter();
	const [isClicked, setIsClicked] = useState(pageIndex);
	const onClick = (index: number, key: string) => {
		setIsClicked(index);

		router.push(key);
	};
	return (
		<Container>
			{items.map((item: MenuItemProps, index: number) => (
				<MenuItem key={item.key} onClick={() => onClick(index, item.key)}>
					<MenuItemContent index={index} clickedItem={isClicked}>
						{t(`navigation:${item.label}`)}
					</MenuItemContent>
				</MenuItem>
			))}
		</Container>
	);
}

interface HeaderMenuProps {
	pageIndex: number;
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
	color: ${({ clickedItem, index }) =>
		clickedItem === index ? '#DB1A1A;' : '#BEBEBE'};
	font-weight: bold;
	border-bottom: ${({ clickedItem, index }) =>
		clickedItem === index ? ' 2px solid #DB1A1A;' : 0};
`;
