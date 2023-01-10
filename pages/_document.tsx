import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
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
  
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services`}
          />
          <meta property="og:title" content="비엣커넥트" />
          <meta property="og:description" content="베트남 한국 일자리 플랫폼" />
          <meta property="og:type" content="website" />
          {/* <meta property="og:url" content="www.eobi.kr" /> */}
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:title" content="비엣커넥트" />
          <meta
            property="twitter:description"
            content="베트남 한국 일자리 플랫폼"
          />
          <title>비엣커넥트 | VIET-CONNECT</title>
          <meta
            name="description"
            content="신개념 재고 예약 플랫폼 어비에서 저렴한 가격으로 재고를 예약하여 상품을 수령 또는 환급하세요"
          />
          <meta
            name="keywords"
            content="비엣커넥트,알바,베트남,한국,취업,음식점,주방,공장"
          />
          {/* <meta name="google-site-verification" content="ULUWfnC1" />
          <meta name="naver-site-verification" content="b978ec9a6" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
