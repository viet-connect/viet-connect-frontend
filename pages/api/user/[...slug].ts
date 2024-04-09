import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function user(_req: NextApiRequest, res: NextApiResponse) {
	const { method } = _req;
	const {
		query: { slug },
	} = _req;
	const postId = slug[0];
	const userId = slug[1];

	try {
		switch (method) {
			case 'POST': {
				const currentUser = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				});

				await prisma.user.update({
					where: {
						id: userId,
					},
					data: {
						...currentUser,
						postings: {
							connect: { id: postId },
						},
					},
				});

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
