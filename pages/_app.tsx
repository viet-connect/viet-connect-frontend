import type { AppProps } from 'next/app';
import '../src/config/recoil';

import '../src/styles/globals.css';
import '../src/styles/vars.css';
import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { SessionProvider, useSession } from 'next-auth/react';
import AppConfig from '../src/utils/appConfig';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	// 네트워크가 꺼지거나, 브라우저가 종료될 때, 로컬스토리지 어드민 있는지 확인하고, 종료되도록

	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, user-scalable=no"
						key="viewport"
					/>
				</Head>
				<DefaultSeo {...AppConfig} />
				<Component {...pageProps} />
			</RecoilRoot>
		</SessionProvider>
	);
}

export default appWithTranslation(MyApp);
