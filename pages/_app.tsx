import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import koKR from 'antd/locale/ko_KR';

import '../src/styles/globals.css';
import '../src/styles/vars.css';
import 'antd/dist/reset.css';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<ConfigProvider locale={koKR}>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</ConfigProvider>
	);
}

export default MyApp;
