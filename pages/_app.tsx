import '../src/styles/globals.css';
import 'antd/dist/reset.css';

import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import type { AppProps } from 'next/app';
import Layout from '../src/components/common/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ConfigProvider locale={koKR}>
			<SessionProvider session={session}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</ConfigProvider>
	);
}

export default MyApp;
