import type { AppProps } from 'next/app';
import '../src/config/recoil';

import '../src/styles/globals.css';
import '../src/styles/vars.css';
import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	// 네트워크가 꺼지거나, 브라우저가 종료될 때, 로컬스토리지 어드민 있는지 확인하고, 종료되도록

	return (
		<RecoilRoot>
			<Component {...pageProps} />
		</RecoilRoot>
	);
}

export default appWithTranslation(MyApp);
