import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';
import { Password } from '../../src/utils/bcrypt';
import { SHOW_PAGES } from '../../src/constant/page';

export default async function posting_list(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method, query = {} } = _req;
	try {
		switch (method) {
			case 'GET': {
				const { postingPage = '1' } = query as { postingPage?: string};
				const totalPostings = await prisma.posting.count();
				const totalPages = Math.ceil(totalPostings / SHOW_PAGES);
				const page = parseInt(postingPage, 10) - 1;
				const skip = Number.isNaN(page) ? 0 : page * SHOW_PAGES;
				const postingList = await prisma.posting.findMany({
					orderBy: [
						{
							updatedAt: 'desc',
						},
					],
					skip,
					take: SHOW_PAGES,
				});
				res.status(200).json({ postingList, totalPages });
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
					password,
				} = _req.body;

				const passwordHelper = new Password(password, '');
				const hashedPassword = await passwordHelper.createPassword();

				await prisma.posting.create({
					data: {
						title,
						contactName: contact_name,
						contactNumber: contact_number,
						wageType: wage_type,
						wageAmount: wage_amount,
						gender,
						proficiency,
						workingDay: JSON.stringify(working_day),
						isDayNegotiable: is_day_negotiable,
						startingTime: starting_time,
						endingTime: ending_time,
						isTimeNegotiable: is_time_negotiable,
						contents,
						address: address.full,
						mainAddress: address.main,
						subAddress: address.sub,
						password: hashedPassword,
						viewCount: 0,
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
