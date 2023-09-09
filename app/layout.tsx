import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';
import AppConfig from '../src/utils/appConfig';
import '../src/config/recoil';
import '../src/styles/globals.css';
import '../src/styles/vars.css';
import StyledComponentsRegistry from '../lib/registy';
import GlobalStyles from '../src/styles/globalStyles';

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang={AppConfig.openGraph.locale}>
			<body>
				<StyledComponentsRegistry>
					<GlobalStyles />
					<RecoilRoot>{children}</RecoilRoot>
				</StyledComponentsRegistry>
				<div id="modal-root"></div>
			</body>
		</html>
	);
}

export default RootLayout;
