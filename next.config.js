// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig



const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  lessVarsFilePath: './src/styles/antd-custom.less',
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},
  compilerOptions: {
    baseUrl: ".",
    rootDir: ".",
    paths: {
      "src/*": [
        "src/*"
      ],
      "public/*": [
        "public/*"
      ],
    }
  },
  webpack(config) {
    config.resolve.modules.push(__dirname); // 추가
    return config;
  },
  // env: {
  //   KAKAO_JS_KEY: process.env.KAKAO_JS_KEY,
  //   KAKAO_API_KEY: process.env.KAKAO_API_KEY,
  //   KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
  // },
  reactStrictMode: false,
});
