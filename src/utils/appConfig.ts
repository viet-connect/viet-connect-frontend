const AppConfig = {
	defaultTitle:
		'외국인 알바 찾을땐? 비엣커넥트. Vietconnect giới thiệu việc làm tại Hàn Quốc',
	description:
		'국내 체류 외국인 대상 채용플랫폼 비엣커넥트입니다 | Giới thiệu việc làm cho người Việt sống ở Hàn Quốc miễn phí.',
	canonical: 'https://vietconnect.co.kr',
	languageAlternates: [
		{
			hrefLang: 'ko_KR',
			href: 'https://vietconnect.co.kr',
		},
		{
			hrefLang: 'vi_VN',
			href: 'https://www.vietconnect.co.kr/vn',
		},
	],
	additionalMetaTags: [
		{
			name: 'keywords',
			content:
				'tìm việc làm tại hàn quốc, việc làm tại hàn quốc, giới thiệu việc làm tại Hàn Quốc, 외국인 알바',
		},
	],
	additionalLinkTags: [
		{
			rel: 'icon',
			type: 'image/png',
			href: '/favicon-16x16.png',
			sizes: '16x16',
			key: 'icon16',
		},
		{
			rel: 'icon',
			type: 'image/png',
			href: '/favicon-32x32.png',
			sizes: '32x32',
			key: 'icon32',
		},
		{
			rel: 'icon',
			type: 'image/png',
			href: '/favicon-96x96.png',
			sizes: '96x96',
			key: 'icon96',
		},
		{
			rel: 'icon',
			type: 'image/png',
			href: '/android-icon-192x192.png',
			sizes: '196x196',
			key: 'icon196',
		},
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico',
			sizes: '48x48',
		},
	],
	openGraph: {
		url: 'https://vietconnect.co.kr',
		type: 'website',
		locale: 'ko_KR',
		title:
			'외국인 알바 찾을 땐? 비엣커넥트. Vietconnect giới thiệu việc làm tại Hàn Quốc miễn phi',
		site_name: '비엣커넥트',
		images: [
			{
				url: 'https://postfiles.pstatic.net/MjAyMzA4MTlfMTY2/MDAxNjkyNDE5NTM5OTE5.wihT2F94ofYFuj_oTk-nV-5FHlIXjABxSieeQ9COJjsg.wHZbp9_j6WtpFYLwdMJPjS6JYrNfUT-d4Vatv71F_mwg.PNG.hyunwook0521/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2023-01-05_%EC%98%A4%ED%9B%84_6.41.54.png?type=w773',
				width: 100,
				height: 30,
				alt: '이미지',
			},
		],
	},
	// twitter: {
	// 	handle: '@handle',
	// 	site: '@site',
	// 	cardType: 'summary_large_image',
	// },
};

export default AppConfig;
