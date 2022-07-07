import '../src/styles/globals.css';
require('../src/styles/antd-custom.less');

import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={koKR}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
