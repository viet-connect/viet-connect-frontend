import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function user(_req: NextApiRequest, res: NextApiResponse) {
	const { method } = _req;
	const {
		query: { pid },
	} = _req;

	try {
		switch (method) {
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

				await prisma.posting.update();

				res.status(200).end('Posting has been updated');
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
