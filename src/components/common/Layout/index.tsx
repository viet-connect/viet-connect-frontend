import styled from 'styled-components';
import type { ReactNode } from 'react';

import Logo from '../../main/header_top/logo';
import FooterTop from '../../main/footer/footer_top/FooterTop';
import FooterBottom from '../../main/footer/footer_bottom/FooterBottom';
import Meta from './meta';
import Flag from '../../main/header_top/flag';
import Content from './Content';

interface IMainProps {
	children: ReactNode;
	pageIndex: number;
}

export default function Layout({ children, pageIndex }: IMainProps) {
	return (
		<Wrapper>
			<Meta />
			<Container id="layout-container">
				<Header>
					<Row>
						<Logo />
						<Flag />
					</Row>
				</Header>
				<Content pageIndex={pageIndex}>{children}</Content>
				<Footer>
					<FooterTop />
					<FooterBottom />
				</Footer>
			</Container>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	/* width: 100%; */
	height: 100%;
	/* display: flex; */
	font-family: Arial, Helvetica, sans-serif;
`;

const Container = styled.div`
	/* min-width: 350px;
	max-width: 1024px; */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 532px;
	height: 100%;
	box-sizing: border-box;
	padding: 20px;
	margin: auto;
`;

const Header = styled.div`
	/* width: 100%; */
	height: max-content;
`;

const Footer = styled.div`
	height: max-content;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
