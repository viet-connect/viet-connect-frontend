import styled from 'styled-components';
import type { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';
import Logo from '../../main/header_top/logo';
import FooterTop from '../../main/footer/footer_top/FooterTop';
import FooterBottom from '../../main/footer/footer_bottom/FooterBottom';
import Flag from '../../main/header_top/flag';
import Content from './Content';
import { Analytics } from '../Analytics/Analytics';
import LoginButton from '../Login/LoginButton';
import KakaoChatButton from '../KakaoButton';

interface IMainProps {
  children: ReactNode;
  pageIndex: number;
}

export default function Layout({ children, pageIndex }: IMainProps) {
  return (
    <Wrapper>
      <Container id="layout-container">
        <Header>
          <Row>
            <Logo />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LoginButton />
              <Flag />
            </div>
          </Row>
        </Header>
        <Content pageIndex={pageIndex}>{children}</Content>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Analytics />
        <Footer>
          <FooterTop />
          <FooterBottom />
        </Footer>
        <div className="chat" style={{ maxWidth: '500px' }}>
          <KakaoChatButton size="small" />
        </div>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* width: 100%; */
  height: 100%;
  /* display: flex; */
`;

const Container = styled.div`
  /* min-width: 350px;
	max-width: 1024px; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 532px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin: auto;

  .chat {
    z-index: 999;
    position: sticky;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
  }
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
