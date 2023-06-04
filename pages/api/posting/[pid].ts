import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function posting(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = _req;
	const {
		query: { pid },
	} = _req;

	try {
		switch (method) {
			case 'GET': {
				const uniquePosting = await prisma.posting.findUnique({
					where: {
						id: pid,
					},
				});

				res.status(200).json(uniquePosting);
				break;
			}

			case 'PUT': {
				res.status(200).end('Posting has been updated');
				break;
			}

			case 'DELETE': {
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
