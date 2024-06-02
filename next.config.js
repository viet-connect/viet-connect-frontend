/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
	env: {
		DEPLOY_URL: process.env.DEPLOY_URL,
	},
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	webpack: (
		config,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
	) => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
	i18n,
	async redirects() {
		return [
			{
				source: '/forum/posting',
				destination: '/forum',
				permanent: false,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'k.kakaocdn.net',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;

// webpack: (config, options) => {
//   config.module.rules.push({
//     test: /\.mdx/,
//     use: [
//       options.defaultLoaders.babel,
//       {
//         loader: '@mdx-js/loader',
//         options: pluginOptions.options,
//       },
//     ],
//   })

//   return config
// },
// webpack(config) {
//   config.resolve.modules.push(__dirname);
//   return config;
// },
// compiler: {
//   baseUrl: '.',
//   rootDir: '.',
//   paths: {
//     'src/*': ['src/*'],
//     'public/*': ['public/*'],
//   },
// },
// env: {
//   KAKAO_JS_KEY: process.env.KAKAO_JS_KEY,
//   KAKAO_API_KEY: process.env.KAKAO_API_KEY,
//   KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
// },
// include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
// exclude: ['node_modules', '**/node_modules', 'dist'],
