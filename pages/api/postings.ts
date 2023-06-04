import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';
import { Password } from '../../src/utils/bcrypt';

export default async function posting_list(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = _req;
	try {
		switch (method) {
			case 'GET': {
				const postingList = await prisma.posting.findMany();
				res.status(200).json(postingList);
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

				const passwordHelper = new Password(password);
				const hashedPassword = await passwordHelper.createPassword();
				const posting = await prisma.posting.create({
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
						author,
						password: hashedPassword,
					},
				});

				console.log(posting, 'posting');

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
