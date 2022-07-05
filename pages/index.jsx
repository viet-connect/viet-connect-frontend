import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Home(home) {
  return (
    <Wrapper>
      <Row style={{ maxWidth: '1024px', width: '100%' }}>
        <Col span={24}>
          <Row justify="space-between" style={{ margin: '10px' }}>
            <Col>
              <img
                src={'/assets/vietconnect-logo.png'}
                style={{ width: '120px' }}
              />
            </Col>
            <Col>
              <Button>사장님 로그인</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
}
