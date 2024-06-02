import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSession } from 'next-auth/react';
import Layout from '../../src/components/common/Layout';
import MyInformationPage from '../../src/components/my_information';
import { User } from '../../src/models/user';

export default function MyInformation({ data }) {
  return <Layout pageIndex={4}>{data ? <MyInformationPage data={data} /> : <div></div>}</Layout>;
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const session = await getSession(context);
  const i18n = ['common', 'detail', 'jobTable', 'navigation', 'opening', 'posting', 'login', 'myPage'];
  const translation = await serverSideTranslations(locale, i18n);
  let data = null;
  if (session.user.id) {
    data = await User.getUserInfo(session.user.id);
  }
  return { props: { ...translation, data } };
}
