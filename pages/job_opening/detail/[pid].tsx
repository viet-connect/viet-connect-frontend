import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../../src/components/common/Layout';
import ContentHeader from '../../../src/components/job_opening/detail/content_header';
import MainContent from '../../../src/components/job_opening/detail/main_content';
import { Posting } from '../../../src/models/posting';
import LocationInfo from '../../../src/components/job_opening/detail/location_iinfo';
import CommonButton from '../../../src/components/common/Button';
import { User } from '../../../src/models/user';

export default function JobOpeningDetail({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const { t } = useTranslation();
  const session = useSession();
  const sessionData = session?.data;

  const onApplyJobOpening = async () => {
    setIsLoading(true);
    try {
      if (session.status === 'authenticated') {
        await User.handleApplyPosting(data.id, sessionData?.user?.id);
        setIsApplied(true);

        toast.success('지원이 완료되었습니다.');
        return;
      }

      signIn();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  const isAppliedPosting = useMemo(
    () => data.appliedUsers.find(({ id }) => id === sessionData?.user?.id),
    [data.appliedUsers, sessionData],
  );

  return (
    <Layout pageIndex={0}>
      <Container>
        <ContentHeader data={data} />
        <MainContent data={data} />
        <LocationInfo data={data} />
        <ButtonOutterWrapper>
          <CommonButton
            wrapperStyle={{
              height: 45,
              color: '#1890ff',
            }}
            disabled={isApplied || Boolean(isAppliedPosting)}
            loading={isLoading}
            onClick={onApplyJobOpening}
          >
            <ButtonChildrenWrapper>
              <ButtonTextWrapper>{t('posting:applyBtnLabel')}</ButtonTextWrapper>
            </ButtonChildrenWrapper>
          </CommonButton>
        </ButtonOutterWrapper>
        {/* <div>****비엣커넥트 경영진 인증용 코드******</div>
        <div>공고만든자사람 이름이랑 아이디 연동완료</div>
        <div>이름:{data.postedUsers[0].name} = 공고의 창시자</div>
        <div>아이디:{data.postedUsers[0].id} = 공고의 창시자</div>
        <div>{data.appliedUsers.map((user) => user.name)}님이 지원하였습니다</div> */}
      </Container>
    </Layout>
  );
}

const Container = styled.div``;

const ButtonOutterWrapper = styled.div`
  margin-bottom: 20px;
`;

const ButtonChildrenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ButtonTextWrapper = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 400;
`;

export async function getServerSideProps(context) {
  const data = await Posting.getUniquePosting(context.query.pid);
  return {
    props: {
      data,
      ...(await serverSideTranslations(context.locale, [
        'common',
        'detail',
        'jobTable',
        'navigation',
        'opening',
        'posting',
        'login',
      ])),
    },
  };
}
