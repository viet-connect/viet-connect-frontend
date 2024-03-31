import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function user(_req: NextApiRequest, res: NextApiResponse) {
	const { method } = _req;
	const {
		query: { slug },
	} = _req;
	const userId = slug[0];
	const postId = slug[1];

	try {
		switch (method) {
			case 'PUT': {
				// await prisma.posting.update();

				res.status(200).json({ message: 'apply update' });
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
