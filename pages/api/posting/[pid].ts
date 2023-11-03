import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { Password } from '../../../src/utils/bcrypt';

export default async function posting(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = _req;
	const {
		query: { pid },
	} = _req;
	const CURRENT_PASSWORD_LIMIT = 12;

	try {
		switch (method) {
			case 'GET': {
				const uniquePosting = await prisma.posting.findUniqueOrThrow({
					where: {
						id: pid,
					},
				});

				await prisma.posting.update({
					where: {
						id: pid,
					},
					data: {
						viewCount: {
							increment: 1,
						},
					},
				});

				res.status(200).json(uniquePosting);
				break;
			}

			case 'PUT': {
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
				let savingPassword = '';

				if (password.length > CURRENT_PASSWORD_LIMIT) {
					savingPassword = password;
				} else {
					savingPassword = await passwordHelper.createPassword();
				}

				await prisma.posting.update({
					where: {
						id: pid,
					},
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
						password: savingPassword,
					},
				});

				res.status(200).end('Posting has been updated');
				break;
			}

			case 'DELETE': {
				await prisma.posting.delete({
					where: {
						id: pid,
					},
				});

				console.log('Posting has been deleted');
				res.status(200).end('Posting has been deleted successfully');
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
