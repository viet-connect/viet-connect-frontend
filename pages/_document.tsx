import Document, { Html, Head, Main, NextScript } from 'next/document';
import AppConfig from '../src/utils/appConfig';

class MyDocument extends Document {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<Html lang={AppConfig.openGraph.locale}>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
