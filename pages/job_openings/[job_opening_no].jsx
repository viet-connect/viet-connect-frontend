import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Divider } from 'antd';
import { AuditOutlined, PhoneOutlined } from '@ant-design/icons';
const { Title, Text, Paragraph } = Typography;
import SalarySystemTag from '../../src/components/common/Tag/SalarySystemTag';
import styled from 'styled-components';
import Layout from 'src/components/common/Layout';
import categoriesJson from '../../src/utils/categories.json';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: max-content;
  color: #222;
`;

export default function JobOpeningDetail({ job_opening_no }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [jobOpeningContents, setJobOpeningContents] = useState({
    id: 'id',
    category_id: 0,
    title: '동대문 한국외국어대학교 미스사이공 주방 알바 급구',
    shop: '미스사이공 한국외대점',
    tel: '032-326-5979',
    gender: 'male',
    korean_ability: '1',
    salary_system: 'daily',
    salary: 100000,
    recruitment_number: '5',
    work_time: '10:00 ~ 17:00',
    work_period: '6개월',
    work_date: ['월', '화', '수'],
    is_dorm: '0',
    is_work_time_negotiable: '0',
    is_work_date_negotiable: '0',
    description: '인터넷에서 화장품판매, instagram하고 facebook에서 판매',
    is_premium: '0',
    status: 'ongoing',
    region_address: {
      address_name: '전북 익산시 부송동 100',
      region_1depth_name: '전북',
      region_2depth_name: '익산시',
      region_3depth_name: '부송동',
      region_3depth_h_name: '삼성동',
      h_code: '4514069000',
      b_code: '4514013400',
      mountain_yn: 'N',
      main_address_no: '100',
      sub_address_no: '',
      x: '126.99597295767953',
      y: '35.97664845766847',
    },
    road_address: {
      address_name: '전북 익산시 망산길 11-17',
      region_1depth_name: '전북',
      region_2depth_name: '익산시',
      region_3depth_name: '부송동',
      road_name: '망산길',
      underground_yn: 'N',
      main_building_no: '11',
      sub_building_no: '17',
      building_name: '',
      zone_no: '54547',
      y: '35.976749396987046',
      x: '126.99599512792346',
    },
    detail_region_address: '상세지번주소',
    detail_road_address: '상세도로명주소',
    expiry_datetime: '공고종료시간',
    created_datetime: '2022년 3월 22일',
    enabled: '삭제여부(0:삭제, 1:살아있음)',
  });
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}`;
    script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild(script);
  }, []);
  useEffect(() => {
    if (!mapLoaded) return;
    console.log(jobOpeningContents.region_address.x);
    kakao.maps.load(() => {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(
          jobOpeningContents.region_address.y,
          jobOpeningContents.region_address.x,
        ),
        level: 3,
      };

      var map = new kakao.maps.Map(container, options);
    });
  }, [mapLoaded]);
  return (
    <Wrapper>
      <Layout>
        <Row style={{ padding: '20px 10px' }}>
          <Col span={24}>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: '5px' }}
            >
              <Col
                style={{
                  fontSize: '15px',
                  // fontWeight: 500,
                  // marginLeft: '5px',
                }}
              >
                <Text keyboard>{jobOpeningContents.shop}</Text>
              </Col>
              <Col style={{ color: '#6f6e6f', fontSize: '13px' }}>
                {jobOpeningContents.created_datetime}
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col
                    span={24}
                    style={{
                      fontSize: '23px',
                      fontWeight: 'bold',
                    }}
                  >
                    <Text>{jobOpeningContents.title}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* <Row justify="space-between">
              <Col>
                <Text>
                  <SalarySystemTag
                    salarySystem={jobOpeningContents.salary_system}
                    style={{ marginRight: '0px' }}
                  />
                </Text>
                <Text style={{ fontSize: '14px', fontWeight: 500 }}>
                  {jobOpeningContents.salary.toLocaleString()} 원
                </Text>
              </Col>
              <Col>
                <Text
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >{`${jobOpeningContents.region_address.address_name} ${jobOpeningContents.detail_region_address}`}</Text>
              </Col>
            </Row> */}
            {/* <Divider style={{ margin: '10px 0 ' }} /> */}
            {/* 모집 조건 블록 */}
            <Row style={{ marginTop: '30px' }}>
              <Col span={24}>
                <Row>
                  <Col>
                    <Title level={4}>모집조건</Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      모집인원
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>
                      {jobOpeningContents.recruitment_number} 명
                    </Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      모집성별
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>
                      {jobOpeningContents.gender == 'male'
                        ? '남자'
                        : jobOpeningContents.gender == 'female'
                        ? '여자'
                        : '성별무관'}
                    </Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      모집분야
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>
                      {
                        categoriesJson.categories[
                          jobOpeningContents.category_id
                        ].name
                      }
                    </Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      한국어 구사능력
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>
                      {jobOpeningContents.korean_ability == 0
                        ? '무상관'
                        : jobOpeningContents.korean_ability == 1
                        ? '하'
                        : jobOpeningContents.korean_ability == 2
                        ? '중'
                        : '하'}
                    </Title>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* 근무조건 블록 */}
            <Row style={{ marginTop: '20px' }}>
              <Col span={24}>
                <Row>
                  <Col>
                    <Title level={4} style={{ fontWeight: 'bold' }}>
                      근무조건
                    </Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      급여
                    </Title>
                  </Col>
                  <Col>
                    <SalarySystemTag
                      salarySystem={jobOpeningContents.salary_system}
                    />
                  </Col>
                  <Col>
                    <Title level={5}>
                      {jobOpeningContents.salary.toLocaleString()} 원
                    </Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      근무기간
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>{jobOpeningContents.work_period}</Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      근무요일
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>
                      {jobOpeningContents.work_date.join()}
                    </Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      근무시간
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>{jobOpeningContents.work_time}</Title>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* 상세정보 블록 */}
            <Row style={{ marginTop: '20px' }}>
              <Col>
                <Row>
                  <Col>
                    <Title level={4} style={{ fontWeight: 'bold' }}>
                      상세정보
                    </Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col>
                    <Row>
                      <Col>
                        <Text style={{ fontSize: '15px' }}>
                          {jobOpeningContents.description}
                        </Text>
                      </Col>
                    </Row>
                    {/* <Divider style={{ margin: '15px 0' }} />
                    <Row>
                      <Col>
                        <Button>Translation</Button>
                      </Col>
                    </Row> */}
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* 근무지역 블록 */}
            <Row style={{ marginTop: '20px' }}>
              <Col span={24}>
                <Row>
                  <Col>
                    <Title level={4} style={{ fontWeight: 'bold' }}>
                      근무지역
                    </Title>
                  </Col>
                </Row>
                {/* <Row>
                  <Col>
                    <Text style={{ color: '#6f6e6f', fontSize: '13px' }}>
                      주소 (주소명 우측에 복사버튼)
                    </Text>
                  </Col>
                </Row> */}
                <Row>
                  <Col span={24}>
                    <Paragraph
                      style={{
                        display: 'inline',
                        fontSize: '14px',
                      }}
                      ellipsis={true}
                      copyable
                    >
                      {' '}
                      {`${jobOpeningContents.region_address.address_name} ${jobOpeningContents.detail_region_address}`}
                    </Paragraph>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div
                      id="map"
                      style={{
                        width: '100%',
                        height: '200px',
                      }}
                    ></div>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* 회사정보 블록 */}
            <Row style={{ marginTop: '20px' }}>
              <Col>
                <Row>
                  <Col>
                    <Title level={4} style={{ fontWeight: 'bold' }}>
                      회사정보
                    </Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      업체명
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>{jobOpeningContents.shop}</Title>
                  </Col>
                </Row>
                <Row style={{ paddingLeft: '20px' }}>
                  <Col style={{ width: '150px' }}>
                    <Title level={5} style={{ color: 'gray' }}>
                      연락처
                    </Title>
                  </Col>
                  <Col>
                    <Title level={5}>{jobOpeningContents.tel}</Title>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Divider style={{ margin: '10px 0' }} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Text
                  style={{
                    color: '#99005e',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  🚨 구직이 아닌 광고등의 목적으로 연락처를 이용할 경우 법적
                  처벌을 받을 수 있습니다.
                </Text>
              </Col>
            </Row>
            {/* 버튼 블록 */}
            <Row justify="center" style={{ marginTop: '20px' }}>
              <Col style={{ marginRight: '10px' }}>
                <Button type="primary" size="large">
                  <AuditOutlined />
                  지원하기
                </Button>
              </Col>
              <Col>
                <Button type="primary" size="large">
                  <PhoneOutlined />
                  통역서비스신청
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </Wrapper>
  );
}

export async function getServerSideProps({ params }) {
  const { job_opening_no } = params;
  console.log(job_opening_no);
  // const res = await req(
  //     'get',
  //     '/user/product',
  //     (res) => res,
  //     { params: { product_no } }
  // );
  // const errorCode = res.status === 200 ? false : res.status;
  // const errorMessage = res.status === 200 ? "" : res.data.message;
  // const product = res.data;
  return {
    props: {
      job_opening_no,
    },
  };
}
