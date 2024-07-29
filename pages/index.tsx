import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import Layout from '../src/components/common/Layout';
import HomeFilter from '../src/components/home/filter';
import JobList from '../src/components/home/job_list';
import { Posting } from '../src/models/posting';
import PageController from '../src/components/common/PageController';
import GoogleAd from '../src/components/common/GoogleAd';
import MetaHead from '../src/components/common/MetaHead';

export default function Home({ data = { list: [], serviceList: [], totalPages: 0 } }) {
  const { list, totalPages, serviceList } = data;
  const { t } = useTranslation();
  return (
    <Layout pageIndex={0}>
      <MetaHead title={`: ${t('navigation:jobTable')}`} />
      <Container>
        <HomeFilter />
        <JobList tableContent={list} serviceList={serviceList} />
        <PageController totalPages={totalPages} />
        <GoogleAd />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export async function getServerSideProps(context) {
  const { locale, query } = context;
  const { list = [], serviceList = [], totalPages = 1 } = (await Posting.getPostingList(query)) ?? {};

  return {
    props: {
      data: { list, serviceList, totalPages },
      ...(await serverSideTranslations(locale, [
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
