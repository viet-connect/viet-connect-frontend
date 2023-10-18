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
				url: 'https://blogfiles.pstatic.net/MjAyMzEwMTlfMTM5/MDAxNjk3NjQzOTY2OTcy.UQiGtO8ljSS8t3M7gXrrcri9yrXq02JDl5qr5aO-fAog.EjM8II_VuYYSeKaj-MMHBFnabTh1ohEMj8lzfBaCAxcg.PNG.dyddyd14321/vietconnect_og.png',
				width: 171,
				height: 90,
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
