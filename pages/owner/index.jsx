import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import Layout from 'src/components/common/Layout';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Home(home) {
  return <Layout>사장님페이지</Layout>;
}
