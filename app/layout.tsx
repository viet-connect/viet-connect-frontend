import { RecoilRoot } from 'recoil';
import AppConfig from '../src/utils/appConfig';
import '../src/config/recoil';
import '../src/styles/globals.css';
import '../src/styles/vars.css';

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang={AppConfig.openGraph.locale}>
			<body>
				<RecoilRoot>{children}</RecoilRoot>
				<div id="modal-root"></div>
			</body>
		</html>
	);
}
