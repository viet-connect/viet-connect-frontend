import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import paths from '../../../../constant/path';

export default function Menu({ pageIndex }: HeaderMenuProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { status } = useSession();
  const items = useMemo(() => {
    if (status === 'authenticated') return paths;
    return paths.filter((path) => path.label !== 'myInformation');
  }, [status]);

  const [isClicked, setIsClicked] = useState(pageIndex);
  const onClick = (index: number, key: string) => {
    if (key === '/job_opening/posting' && status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    setIsClicked(index);

    router.push(key);
  };

  return (
    <Container>
      {items.map((item: MenuItemProps, index: number) => (
        <MenuItem key={item.key} onClick={() => onClick(index, item.key)}>
          <MenuItemContent $index={index} $clickedItem={isClicked}>
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
  $clickedItem: number;
  $index: number;
}

interface MenuProps {
  items: Array<MenuItemProps>;
}

const Container = styled.ul`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  line-height: 46px;
  font-size: 14px;
  list-style: none;
  padding-inline-start: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding-inline: 11px;
  cursor: pointer;
`;

const MenuItemContent = styled.div<MenuItemContentProps>`
  color: ${({ $clickedItem, $index }) => ($clickedItem === $index ? '#DB1A1A;' : '#BEBEBE')};
  font-weight: bold;
  border-bottom: ${({ $clickedItem, $index }) => ($clickedItem === $index ? ' 2px solid #DB1A1A;' : 0)};
  line-height: normal;
  padding: 16px 0px;

  @media (max-width: 500px) {
    white-space: pre-line;
  }
`;
