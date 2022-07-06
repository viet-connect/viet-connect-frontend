import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Select, Button } from 'antd';
const { Option } = Select;
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Layout from 'src/components/common/Layout';
import BannerCarousel from 'src/components/common/BannerCarousel';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Home({}) {
  return (
    <Layout>
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
    </Layout>
  );
}
