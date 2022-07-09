import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Button, Menu, Divider, Typography } from 'antd';
import { useRouter } from 'next/router';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import LoginModal from "src/components/common/Modal/LoginModal";
import { useAuth } from '../../../../context/AuthContext';

const { Text } = Typography;
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

const items = [
  { label: '채용공고', key: '/' },
  { label: '인재등록', key: '/customer/resume', disabled: 'true' },
  { label: '채용공고등록', key: '/owner/jobopening', disabled: 'true' },
];

export default function Layout({ children }) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, logout } = useAuth();

  const handleClickLogout = async () => {
    try {
      await logout();
    } catch(err) {
      console.log(err);
    }
  }

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
              {user ? (
                <Button
                type="primary"
                style={{ borderRadius: '5px', fontWeight: 'bold' }}
                onClick={handleClickLogout}
              >
                로그아웃
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{ borderRadius: '5px', fontWeight: 'bold' }}
                  onClick={() => setIsModalVisible(true)}
                >
                  로그인
                </Button>
              )}
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
        <Footer>
          <Row
            style={{
              padding: '16px',
            }}
          >
            <Col>
              <Text>상호 : 글루</Text>
              <Divider type="vertical" />
              <Text>대표 : 강경욱</Text>
              <Divider type="vertical" />
              <Text strong>개인정보책임자 : 강경욱 </Text>
              <Divider type="vertical" />
              <br />
              <Text>사업자등록번호 : 145-45-00814 </Text>
              <Divider type="vertical" />
              <br />
              <Text>
                주소 : 서울특별시 광진구 천호대로 143길 34, 지하층 1호(광장동)
              </Text>
              <Divider type="vertical" />
              <br />
              <Text>대표이메일 : rkdrud34@gmail.com</Text>
              <Divider type="vertical" />
              <br />
              <Text>대표전화 : 010-2978-3479</Text>
              <Divider type="vertical" />
              {/* </Space> */}
            </Col>
          </Row>
          <Row justify="center">
            <Col
              style={{
                fontSize: '10px',
                color: '#c7c7c7',
              }}
            >
              COPYRIGHT © 모아이 inc. All RIGHTS RESERVED.
            </Col>
          </Row>
        </Footer>
      </Container>
      <LoginModal setIsModalVisible={() => setIsModalVisible()} isModalVisible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}/>
    </Wrapper>
  );
}
