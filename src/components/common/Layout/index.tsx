import styled from 'styled-components';
import type { ReactNode } from 'react';

import Logo from '../../main/header_top/logo';
import FooterTop from '../../main/footer/footer_top/FooterTop';
import FooterBottom from '../../main/footer/footer_bottom/FooterBottom';
import HeaderMenu from '../../main/header_menu/HeaderMenu';
import Meta from './meta';
import Flag from '../../main/header_top/flag';

interface IMainProps {
	children: ReactNode;
	pageIndex: number;
}

export default function Layout({ children, pageIndex }: IMainProps) {
	return (
		<Wrapper>
			<Meta />
			<Container>
				<Header>
					<Row>
						<Logo />
						<Flag />
					</Row>
				</Header>
				<Nav>
					<HeaderMenu pageIndex={pageIndex} />
				</Nav>
				<Main>{children}</Main>
				<Footer>
					<FooterTop />
					<FooterBottom />
				</Footer>
			</Container>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const Container = styled.div`
	min-width: 350px;
	max-width: 1024px;
	width: 100%;
`;

const Header = styled.div`
	width: 100%;
	height: max-content;
`;

const Nav = styled.div`
	width: 100%;
	height: max-content;
	margin-bottom: 10px;
`;

const Main = styled.div`
	width: 100%;
	min-height: calc(100vh - 210px);
	height: max-content;
`;

const Footer = styled.div`
	width: 100%;
	height: max-content;
`;

const Row = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
