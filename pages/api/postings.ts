import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';
import { IMockPosting } from '../../src/models/posting';

// Fake users data -> make UUID later / date time 등 데이터 타입수정
const postings = [
	{
		job_opening_no: 1,
		region: '서울특별시 서대문구',
		title: '만리동 제일닭꼬치 주방직원 급구합니다. 처우 좋음',
		salary: { wage: '1,000,000원', way: 0 },
		date: '04-01',
	},
	{
		job_opening_no: 2,
		region: '서울특별시 종로구',
		title: '종로3가 오빠닭 서빙 및 주방직원 급구합니다. 외국인 환영',
		salary: { wage: '500,000원', way: 1 },
		date: '04-05',
	},
	{
		job_opening_no: 3,
		region: '서울특별시 서대문구',
		title: '서대문구 계동치킨 배달 및 서빙 구합니다',
		salary: { wage: '10,000', way: 3 },
		date: '04-01',
	},
	{
		job_opening_no: 4,
		region: '서울특별시 종로구',
		title: '나나닭꼬치 주방직원 급구합니다. 처우 좋음',
		salary: { wage: '2,000,000원', way: 0 },
		date: '04-01',
	},
	{
		job_opening_no: 5,
		region: '서울특별시 서대문구',
		title: '박스소포장하는 직원분 구합니다. 숙식제공합니다. 문의환영',
		salary: { wage: '7,000', way: 3 },
		date: '04-07',
	},
	{
		job_opening_no: 6,
		region: '서울특별시 종로구',
		title: '일산 제일닭꼬치 주방직원 급구합니다. 처우 좋음',
		salary: { wage: '2,000,000원', way: 0 },
		date: '04-01',
	},
	{
		job_opening_no: 7,
		region: '서울특별시 서대문구',
		title: '서대문 생고기 주방직원 급구합니다. 처우 좋음',
		salary: { wage: '7,000', way: 3 },
		date: '04-01',
	},
	{
		job_opening_no: 8,
		region: '서울특별시 종로구',
		title: '파리바케트 베이킹 직원 급구합니다. 처우 좋음',
		salary: { wage: '2,000,000원', way: 0 },
		date: '04-01',
	},
];

export default async function posting_list(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = _req;

	try {
		switch (method) {
			case 'GET': {
				res.status(200).json(postings);
				break;
			}
			case 'POST': {
				const {
					title,
					contact_name,
					contact_number,
					wage_type,
					wage_amount,
					gender,
					proficiency,
					working_day,
					is_day_negotiable,
					starting_time,
					ending_time,
					is_time_negotiable,
					contents,
					address,
					author,
					password,
				} = _req.body;

				const posting = prisma.posting.create({
					data: {
						title,
						contact_name,
						contact_number,
						wage_type,
						wage_amount,
						gender,
						proficiency,
						working_day,
						is_day_negotiable,
						starting_time,
						ending_time,
						is_time_negotiable,
						contents,
						address,
						author,
						password,
					},
				});
				res.status(201).send({ message: 'ok' });
				break;
			}
			default: {
				res.setHeader('Allow', ['GET', 'PUT']);
				res.status(405).end(`Method ${method} Not Allowed`);
			}
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'server error' });
	}
}
