import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Select, Button, Space, Table, Tag } from 'antd';
const { Option } = Select;
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Layout from 'src/components/common/Layout';
import BannerCarousel from 'src/components/common/BannerCarousel';
const Wrapper = styled.div`
  .ant-card-body {
    padding: 5px 20px;
  }
`;
const columns = [
  {
    title: '공고',
    dataIndex: 'is_premium',
    key: 'isPremium',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '지역',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '급여방식',
    key: 'salary_way',
    dataIndex: 'salary_way',
  },
  {
    title: '급여',
    key: 'salary',
    dataIndex: 'salary',
  },
  {
    title: '직무',
    key: 'category',
    dataIndex: 'category',
  },
  {
    title: '',
    render: () => <Button type="primary">지원하기</Button>,
  },
];
const data = [
  {
    key: '1',
    is_premium: 'PREMIUM',
    region: '서울시 중구',
    title: '미스사이공 주방직원 급구',
    salary_way: '일급',
    salary: '100,000원',
    category: '식당',
  },
  {
    key: '1',
    is_premium: 'PREMIUM',
    region: '서울시 중구',
    title: '미스사이공 주방직원 급구',
    salary_way: '일급',
    salary: '100,000원',
    category: '식당',
  },
];
export default function Home({}) {
  return (
    <Layout>
      <Wrapper>
        <Row>
          <Col span={24} style={{ padding: '20px 25px' }}>
            <BannerCarousel />
          </Col>
        </Row>
        <Row justify="center" gutter={12}>
          <Col>
            <Select
              showSearch
              placeholder="시/도 선택"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="jack">부천시 원미구</Option>
              <Option value="lucy">부천시 소사구</Option>
              <Option value="tom">부천시 심곡동</Option>
            </Select>
          </Col>
          <Col>
            <Select
              showSearch
              placeholder="상세 선택"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="jack">부천시 원미구</Option>
              <Option value="lucy">부천시 소사구</Option>
              <Option value="tom">부천시 심곡동</Option>
            </Select>
          </Col>
          <Col>
            <Select
              showSearch
              placeholder="직무 선택"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="jack">부천시 원미구</Option>
              <Option value="lucy">부천시 소사구</Option>
              <Option value="tom">부천시 심곡동</Option>
            </Select>
          </Col>
          <Col>
            <Button type="primary" icon={<SearchOutlined />}>
              검색
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data}
              title={() => '채용정보'}
              pagination={{ position: ['bottomCenter'] }}
            />
          </Col>
        </Row>
      </Wrapper>
    </Layout>
  );
}
