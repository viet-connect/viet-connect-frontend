import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import AppConfig from '../src/utils/appConfig';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<Html lang={AppConfig.openGraph.locale}>
				<Head>
					<meta charSet="UTF-8" key="charset" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge; chrome=1" />
					<meta
						name="naver-site-verification"
						content="a3154e684a886e0928f1e7fbe02fb760c5640589"
					/>
					<link
						rel="icon"
						type="image/png"
						href="/favicon-32x32.png"
						sizes="32x32"
						key="icon32"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<div id="modal-root"></div>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
