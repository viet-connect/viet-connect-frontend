import '../src/styles/globals.css';
require('../src/styles/antd-custom.less');

import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import { AuthService } from '../src/service/authService';
import { AuthContextProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={koKR}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ConfigProvider>
  );
}

export default MyApp;
