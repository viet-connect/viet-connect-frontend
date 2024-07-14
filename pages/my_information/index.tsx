import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getServerSession } from 'next-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/common/Layout';
import MyInformationPage from '../../src/components/my_information';
import { User } from '../../src/models/user';
import { authOptions } from '../api/auth/[...nextauth]';
import GoogleAd from '../../src/components/common/GoogleAd';

export default function MyInformation({ data }) {
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [data]);

  return (
    <Layout pageIndex={4}>
      {data ? <MyInformationPage data={data} /> : <div></div>}
      <GoogleAd />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const i18n = ['common', 'detail', 'jobTable', 'navigation', 'opening', 'posting', 'login', 'myPage'];
  const translation = await serverSideTranslations(locale, i18n);
  const session = await getServerSession(context.req, context.res, authOptions);
  let data = null;
  if (session) {
    data = await User.getUserInfo(session.user.id);
  }
  return { props: { ...translation, data } };
}
