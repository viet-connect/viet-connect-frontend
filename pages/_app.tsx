import type { AppProps } from 'next/app';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
import '../src/config/recoil';

import '../src/styles/globals.css';
import '../src/styles/vars.css';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<RecoilRoot>
			<Component {...pageProps} />
			<Analytics />
		</RecoilRoot>
	);
}

export default MyApp;
