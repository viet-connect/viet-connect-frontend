import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getServerSession } from 'next-auth';
import Layout from '../../src/components/common/Layout';
import MyInformationPage from '../../src/components/my_information';
import { User } from '../../src/models/user';
import { authOptions } from '../api/auth/[...nextauth]';

export default function MyInformation({ data }) {
  return <Layout pageIndex={4}>{data ? <MyInformationPage data={data} /> : <div></div>}</Layout>;
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const i18n = ['common', 'detail', 'jobTable', 'navigation', 'opening', 'posting', 'login', 'myPage'];
  const translation = await serverSideTranslations(locale, i18n);
  const session = await getServerSession(context.req, context.res, authOptions);
  let data = null;
  if (session.user) {
    data = await User.getUserInfo(session.user.id);
  }
  return { props: { ...translation, data } };
}
