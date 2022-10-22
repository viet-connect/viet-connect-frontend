import React from 'react';
import { Row, Col, Menu } from 'antd';
import { useRouter } from 'next/router';

export default function HeaderMenu() {
  const router = useRouter();
  const items = [
    { label: '채용공고', key: '/' },
    { label: '인재등록', key: '/customer/resume', disabled: true },
    { label: '채용공고등록', key: '/owner/jobopening', disabled: true },
  ];

  return (
    <Row>
      <Col span={24}>
        <Menu
          items={items}
          mode="horizontal"
          selectedKeys={items.map((e) => e.key)}
          onClick={(e) => router.push(e.key)}
          style={{ fontWeight: 'bold' }}
        />
      </Col>
    </Row>
  );
}
