import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vn from './locales/vn';
import ko from './locales/ko';

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources: {
			ko,
			vn,
		},
		lng: 'ko', // 기본 설정 언어
		fallbackLng: 'vn', // 번역 파일에서 찾을 수 없는 경우 기본 언어
		ns: ['page'],
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
