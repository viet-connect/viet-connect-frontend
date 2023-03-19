const layoutConstant = Object.freeze({
	ENTERPRISE: '비엣커넥트',
	EXECUTIVE: '정의성, 서현욱',
	PERSONAL_INFO_PERSON_IN_CHARGE: '강경욱',
	ENTERPRISE_NUMBER: '사업자등록번호',
	ADDRESS: '서울 영등포구 의사당대로 83 오투타워',
	COMPANY_EMAIL: 'gluesociety@naver.com',
	COMPANY_PHONE_NUMBER: '010-2242-8129',

	/* 카테고리 분류 */
	FACTORY: '공장',
	FARM: '농장',
	RESTAURANT: '식당',
	CONSTRUCTION: '건축',
	TRANSLATION: '번역',

	/* 1차 지역분류 */
	SEOUL: '서울특별시',
	BUSAN: '부산광역시',
	DAEGU: '대구광역시',
	INCHEON: '인천광역시',
	GWANGJU: '광주광역시',
	DAEJEON: '대전광역시',
	ULSAN: '울산광역시',
	SEJONG: '세종광역시',
	JEJU: '제주광역시',
	GYEONGGI: '경기광역시',
	GANGWON: '강원광역시',
	CHUNGCHEONG_NORTH: '충청북도',
	CHUNGCHEONG_SOUTH: '충청남도',
	JEOLLA_NORTH: '전라북도',
	JEOLLA_SOUTH: '전라남도',
	GEONGSANG_NORTH: '경상북도',
	GEONGSANG_SOUTH: '경상남도',

	/* 2차 지역분류(서울) */
	GANGDONGGU: '강동구',

	/* 2차 지역분류(경기) */
	BUCHEON: '부천시',

	/* 3차 지역분류(역) */
	CHEONHO: '천호',

	/* 3차 지역분류(행정) */
});

const postingConstant = Object.freeze({
	PostingFirstPartInfo: [
		['공고제목', '공고제목을 입력해주세요'],
		['업체명', '업체명을 입력해주세요'],
		['연락처', '구직자가 연락가능한 번호를 입력해주세요'],
	],
	PostingSecondPartInfo: [
		['공장', '식당'],
		['건설', '번역'],
		['사무', '농장'],
		['기타 서비스업', '직접 입력'],
	],
	PostingThirdPartInfo: {
		gender: ['성별 무관', '남자', '여자', '모집성별'],
		proficiency: ['잘함', '보통', '기초', '미숙', '한국어 구사력'],
		day: ['월', '화', '수', '목', '금', '토', '일', '선호 근무요일'],
	},
});

const homeFilterConstant = Object.freeze({
	announcement: {
		renderingTitle: '공고',
		width: 100,
		key: 'is_premium',
	},
	region: {
		renderingTitle: '지역',
		width: 50,
		key: 'region',
		ellipsis: true,
	},
	title: {
		renderingTitle: '제목',
		key: 'title',
		width: 100,
		ellipsis: true,
	},
	wage: {
		renderingTitle: '급여',
		key: 'salary',
		width: 100,
		ellipsis: true,
	},
	category: {
		title: '직무',
		key: 'category',
		width: 100,
		ellipsis: true,
	},
});

export { layoutConstant, postingConstant, homeFilterConstant };
