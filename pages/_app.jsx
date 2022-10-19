import '../src/styles/globals.css';
require('../src/styles/antd-custom.less');

import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ConfigProvider locale={koKR}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ConfigProvider>
  );
}

export default MyApp;
