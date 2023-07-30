import styled from 'styled-components';
import { ReactNode } from 'react';
import HeaderMenu from '../../../main/header_menu/HeaderMenu';

interface IMainProps {
	children: ReactNode;
	pageIndex: number;
}

export default function Content({ children, pageIndex }: IMainProps) {
	return (
		<Wrapper>
			<Nav>
				<HeaderMenu pageIndex={pageIndex} />
			</Nav>
			<Main>{children}</Main>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const Nav = styled.div`
	width: 100%;
	height: max-content;
	margin-bottom: 10px;
`;

const Main = styled.div`
	width: 100%;
	height: max-content;
`;
