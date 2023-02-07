import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import koKR from 'antd/locale/ko_KR';
import Layout from '../src/components/common/Layout';

import '../src/styles/globals.css';
import '../src/styles/vars.css';
import 'antd/dist/reset.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ConfigProvider locale={koKR}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</ConfigProvider>
	);
}

export default MyApp;
