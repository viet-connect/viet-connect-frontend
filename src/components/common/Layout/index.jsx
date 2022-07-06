import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Button, Menu } from 'antd';
import { useRouter } from 'next/router';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  min-width: 400px;
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
`;
const Main = styled.div`
  width: 100%;
  height: max-content;
`;
const Footer = styled.div`
  width: 100%;
  height: max-content;
`;

const items = [
  { label: '채용공고', key: '/' },
  { label: '인재등록', key: '/customer/resume', disabled: 'true' },
  { label: '채용공고등록', key: '/owner/jobopening', disabled: 'true' },
];

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <Wrapper>
      <Container>
        <Header>
          <Row justify="space-between" style={{ margin: '10px' }}>
            <Col>
              <img
                src={'/assets/vietconnect-logo.png'}
                style={{ width: '120px' }}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                style={{ borderRadius: '5px', fontWeight: 'bold' }}
              >
                로그인
              </Button>
            </Col>
          </Row>
        </Header>
        <Nav>
          <Row>
            <Col span={24}>
              <Menu
                items={items}
                mode="horizontal"
                selectedKeys={router.pathname}
                onClick={(e) => router.push(e.key)}
                style={{ fontWeight: 'bold' }}
              />
            </Col>
          </Row>
        </Nav>
        <Main>{children}</Main>
        <Footer></Footer>
      </Container>
    </Wrapper>
  );
}
