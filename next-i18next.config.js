/** @type {import('next-i18next').UserConfig} */
const path = require('path');

module.exports = {
	i18n: {
		defaultLocale: 'ko',
		locales: ['ko', 'vn'],
		localePath: path.resolve('./src/public/locales'),
	},
};
