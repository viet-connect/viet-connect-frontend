const layoutConstant = Object.freeze({
  ENTERPRISE: '글루소사이어티',
  EXECUTIVE: '서현욱',
  PERSONAL_INFO_PERSON_IN_CHARGE: '서현욱',
  ENTERPRISE_NUMBER: '645-32-01502',
  ADDRESS: '인천광역시 연수구 계림로 35번길 27, 3층(청학동)',
  COMPANY_EMAIL: 'gluesociety@naver.com',
  COMPANY_PHONE_NUMBER: '010-8453-8883',
  MAIL_ORDER_SALES_APPROVAL_NUMBER: '2023-인천연수구-3153',
  OCCUPATION_REGISTER_NUMBER: 'J1500020240002',
  MAIN_PHONE: '010-9830-5087',
});

const categoryType = Object.freeze({
  FACTORY: 'factory',
  FARM: 'farm',
  RESTAURANT: 'restaurant',
  CONSTRUCTION: 'construction',
  TRANSLATION: 'translation',
  OTHER: 'other',
});

const residenceType = Object.freeze({
  STUDENT_ABROAD: 'studentAbroad',
  WORKER: 'worker',
  JOB_SEEKER: 'jobSeeker',
  IMMIGRANT: 'immigrant',
  OTHER: 'other',
});

const postingConstant = Object.freeze({
  PostingFirstPartInfo: [
    ['noticeTitle', 'noticePlaceholder', 'title'],
    ['companyName', 'companyNamePlaceholder', 'contact_name'],
    ['contact', 'contactPlaceholder', 'contact_number'],
  ],
  // PostingSecondPartInfo: [
  // 	['공장', '식당'],
  // 	['건설', '번역'],
  // 	['사무', '농장'],
  // 	['기타 서비스업', '직접 입력'],
  // ],
  PostingThirdPartInfo: {
    gender: ['regardlessOfGender', 'male', 'female', 'recruitmentGender'],
    proficiency: ['koLangExcellence', 'koLangAverage', 'koLangBasic', 'koLangirrelevance', 'koLangSkill'],
    working_day: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'preferredWorkday'],
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

const articleCategory = Object.freeze({
  None: 'none',
  Announcement: 'announcement',
  KoreanNews: 'koreanNews',
  KoreanLanguage: 'koreanLanguage',
});

export { layoutConstant, postingConstant, jobTableConstant, categoryType, residenceType, articleCategory };
