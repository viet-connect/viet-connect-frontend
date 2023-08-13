import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';

export default async function posting(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = _req;
	const {
		query: { keyword },
	} = _req;

	try {
		switch (method) {
			case 'GET': {
				const query = `%${keyword}%`;
				const maxResults = 10;
				const searchedPostings = await prisma.$queryRaw(
					prisma.sql`
            SELECT * FROM "Posting"
              WHERE "title" LIKE '${query}'
            LIMIT ${maxResults};
          `,
				);

				res.status(200).json(searchedPostings);
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
