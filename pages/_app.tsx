import '../src/styles/globals.css';
import 'antd/dist/reset.css';

import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { Head } from 'next/document';


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
