import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../src/components/common/Layout';
import MyInformationPage from '../../src/components/my_information';

export default function MyInformation({ data }) {
  return (
    <Layout pageIndex={4}>
      <MyInformationPage data={data} />
    </Layout>
  );
}

export async function getServerSideProps({ locale }) {
  const i18n = ['common', 'detail', 'jobTable', 'navigation', 'opening', 'posting', 'login', 'myPage'];
  const translation = await serverSideTranslations(locale, i18n);
  return { props: { ...translation } };
}
