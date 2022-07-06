import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Button, Menu, Carousel } from 'antd';
import { useRouter } from 'next/router';

import styled from 'styled-components';
const Wrapper = styled.div``;
const contentStyle = {
  height: '30vh',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '10px',
};
export default function BannerCarousel({}) {
  const router = useRouter();
  return (
    <Wrapper>
      <Carousel>
        <div>
          <h3 style={contentStyle}>배너1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>배너2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>배너3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>배너4</h3>
        </div>
      </Carousel>
    </Wrapper>
  );
}
