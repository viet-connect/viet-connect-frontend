import type { AppProps } from 'next/app';
import '../src/config/recoil';

import '../src/styles/globals.css';
import '../src/styles/vars.css';
import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Script from 'next/script';
import AppConfig from '../src/utils/appConfig';
import * as gtag from '../src/lib/gtag';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // 네트워크가 꺼지거나, 브라우저가 종료될 때, 로컬스토리지 어드민 있는지 확인하고, 종료되도록
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" key="viewport" />
          <meta name="google-adsense-account" content="ca-pub-3731091119912055" />
          <meta name="google-site-verification" content="AZZcGA28wo57AUEGR_hMLIl-qSlJaSIB9D_kXRWqoFI" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-434QYEFZM3', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </Head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-434QYEFZM3" />
        <DefaultSeo {...AppConfig} />
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
