import { layoutConstant } from '../../../src/constant/constant';

export default [
	{
		id: 1,
		category: layoutConstant.RESTAURANT,
		title:
			'서울시 강동구 천호역 / TUYỂN NHÂN VIÊN CHẠY BÀN VÀ PHỤ BẾP Ở QUÁN ĂN (gần ga 천호, 5P ĐI BỘ, 군자 대한 곱창)',
		tel: '010-2242-8129',
		gender: 2, // 성별 (0 - female, 1 - male, 2 - irrelevance)
		korean_ability: 1, // 한국어능력(0, 1, 2, 3) 0이 아예 못하는것
		salary_system: 3, // 급여방식(0 - monthly, 1 - weekly, 2 -  daily, 3 - hourly)
		salary: 12000,
		// "recruitment_number": "채용인원",
		// "work_time": "근무시간",
		// "work_period": "근무기간",
		// "work_date": "근무요일(저장방식-> ['월'] / ['월,화']) ",
		// "is_dorm": "**옵션** 기숙사제공여부",
		// "is_work_time_negotiable": "**옵션** 근무시간협의가능여부",
		// "is_work_date_negotiable": "**옵션** 근무요일협의가능여부",
		// "description": "상세공고설명",
		// "is_premium": "프리미엄공고여부",
		// "status": "공고상태(ongoing,done)",
		// "expiry_datetime": "공고종료시간",
		// "created_datetime": "생성시간",
		// "enabled": "삭제여부(0:삭제, 1:살아있음)",
		region_address: {
			region_1depth_name: layoutConstant.SEOUL,
			region_2depth_name: layoutConstant.GANGDONGGU,
		},
	},
	{
		id: 2,
		category: layoutConstant.RESTAURANT,
		title:
			'경기도 부천시 심곡동 gần ga 부천, 춘의 / TUYỂN NHÂN VIÊN PHỤ BẾP Ở QUÁN ĂN (목포명품등갈비 부천점)',
		tel: '010-3246-5534',
		gender: 2, // 성별 (0 - female, 1 - male, 2 - irrelevance)
		korean_ability: 1, // 한국어능력(0, 1, 2, 3) 0이 아예 못하는것
		salary_system: 3, // 급여방식(0 - monthly, 1 - weekly, 2 -  daily, 3 - hourly)
		salary: 10000,
		// "recruitment_number": "채용인원",
		// "work_time": "근무시간",
		// "work_period": "근무기간",
		// "work_date": "근무요일(저장방식-> ['월'] / ['월,화']) ",
		// "is_dorm": "**옵션** 기숙사제공여부",
		// "is_work_time_negotiable": "**옵션** 근무시간협의가능여부",
		// "is_work_date_negotiable": "**옵션** 근무요일협의가능여부",
		// "description": "상세공고설명",
		// "is_premium": "프리미엄공고여부",
		// "status": "공고상태(ongoing,done)",
		// "expiry_datetime": "공고종료시간",
		// "created_datetime": "생성시간",
		// "enabled": "삭제여부(0:삭제, 1:살아있음)",
		region_address: {
			region_1depth_name: layoutConstant.GYEONGGI,
			region_2depth_name: layoutConstant.BUCHEON,
		},
	},
];

// const data = [
//     {
//       job_opening_no: 1,
//       is_premium: 1,
//       region: '서울시 중구',
//       title: {
//         title: '미스사이공 주방직원 급구asdasdas미스사이공 주방직원',
//         is_premium: 1,
//       },
//       salary: { wage: '2,000,000원', way: 'monthly' },
//       category: '요식업',
//     },
//     {
//       job_opening_no: 1,
//       is_premium: 1,
//       region: '서울시 중구',
//       title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
//       salary: { wage: '100,000원', way: 'daily' },
//       category: '요식업',
//     },
//     {
//       job_opening_no: 1,
//       is_premium: 0,
//       region: '서울시 중구',
//       title: { title: '미스사이공 주방직원 급구', is_premium: 1 },
//       salary: { wage: '500,000원', way: 'weekly' },
//       category: '요식업',
//     },
//     {
//       job_opening_no: 1,
//       is_premium: 0,
//       region: '서울시 중구',
//       title: { title: '미스사이공 주방직원 급구', is_premium: 0 },
//       salary: { wage: '8,000원', way: 'hourly' },
//       category: '요식업',
//     },
//   ];
