import type { AppProps } from 'next/app';
import '../src/config/recoil';

import '../src/styles/globals.css';
import '../src/styles/vars.css';
import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<RecoilRoot>
			<Component {...pageProps} />
		</RecoilRoot>
	);
}

export default appWithTranslation(MyApp);
