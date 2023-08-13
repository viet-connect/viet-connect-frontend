const layoutConstant = Object.freeze({
	ENTERPRISE: '비엣커넥트',
	EXECUTIVE: '서현욱',
	PERSONAL_INFO_PERSON_IN_CHARGE: '하태용',
	ENTERPRISE_NUMBER: '101-1451-2572-10',
	ADDRESS: '서울특별시 동대문구 이문로 107',
	COMPANY_EMAIL: 'gluesociety@naver.com',
	COMPANY_PHONE_NUMBER: '010-8453-8883',
});

const category = Object.freeze({
	FACTORY: '공장',
	FARM: '농장',
	RESTAURANT: '식당',
	CONSTRUCTION: '건축',
	TRANSLATION: '번역',
});

const postingConstant = Object.freeze({
	PostingFirstPartInfo: [
		['공고제목', '공고제목을 입력해주세요', 'title'],
		['업체명', '업체명을 입력해주세요', 'contact_name'],
		[
			'연락처',
			'구직자가 연락가능한 휴대폰 번호를 입력해주세요. ex) 010-1234-5678',
			'contact_number',
		],
	],
	// PostingSecondPartInfo: [
	// 	['공장', '식당'],
	// 	['건설', '번역'],
	// 	['사무', '농장'],
	// 	['기타 서비스업', '직접 입력'],
	// ],
	PostingThirdPartInfo: {
		gender: ['성별 무관', '남자', '여자', '모집성별'],
		proficiency: ['잘함', '보통', '기초', '미숙', '한국어 구사력'],
		working_day: ['월', '화', '수', '목', '금', '토', '일', '선호 근무요일'],
	},
});

const jobTableConstant = Object.freeze({
	// announcement: {
	// 	renderingTitle: '공고',
	// 	width: 100,
	// 	key: 'is_premium',
	// },
	region: {
		renderingTitle: '날짜',
		width: 50,
		key: 'date',
		ellipsis: true,
	},
	wage: {
		renderingTitle: '급여',
		key: 'salary',
		width: 100,
		ellipsis: true,
	},
	title: {
		renderingTitle: '제목',
		key: 'title',
		width: 100,
		ellipsis: true,
	},
	// category: {
	// 	renderingTitle: '직무',
	// 	key: 'category',
	// 	width: 100,
	// 	ellipsis: true,
	// },
});

export { layoutConstant, postingConstant, jobTableConstant, category };
