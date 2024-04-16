import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSession } from 'next-auth/react';
import Layout from '../../src/components/common/Layout';
import MyInformationPage from '../../src/components/my_information';
import { User } from '../../src/models/user';

export default function MyInformation({ data }) {
  return (
    <Layout pageIndex={4}>
      <MyInformationPage data={data} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const { user } = await getSession(context);
  const i18n = ['common', 'detail', 'jobTable', 'navigation', 'opening', 'posting', 'login', 'myPage'];
  const translation = await serverSideTranslations(locale, i18n);
  const data = await User.getUserInfo(user.id);
  return { props: { ...translation, data } };
}
