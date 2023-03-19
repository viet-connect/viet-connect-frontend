import React from 'react';
import styled from 'styled-components';
import Menu from '../../common/Menu/HeaderMenu';

interface HeaderMenuProps {
	pageIndex: number;
}

export default function HeaderMenu({ pageIndex }: HeaderMenuProps) {
	return (
		<Container>
			<Menu pageIndex={pageIndex} />
		</Container>
	);
}

const Container = styled.div``;
