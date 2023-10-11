import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';
import { Password } from '../../src/utils/bcrypt';

export default async function article_list(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method } = _req;
	try {
		switch (method) {
			case 'GET': {
				const articleList = await prisma.article.findMany({
					orderBy: [
						{
							createdAt: 'desc',
						},
					],
				});

				res.status(200).json(articleList);
				break;
			}

			case 'POST': {
				const {
					author,
					contents,
					category,
					created_at,
					updated_at,
					password,
					title,
					view_count,
				} = _req.body;

				const passwordHelper = new Password(password, '');
				const hashedPassword = await passwordHelper.createPassword();
				const article = await prisma.article.create({
					data: {
						title,
						author,
						contents,
						category,
						createdAt: created_at,
						updatedAt: updated_at,
						viewCount: view_count,
						password: hashedPassword,
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
