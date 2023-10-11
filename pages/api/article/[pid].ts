import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { Password } from '../../../src/utils/bcrypt';

export default async function article(
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
				const uniqueArticle = await prisma.article.findUnique({
					where: {
						id: pid,
					},
				});

				res.status(200).json(uniqueArticle);
				break;
			}

			case 'PUT': {
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
						author,
						contents,
						category,
						createdAt: created_at,
						updatedAt: updated_at,
						title,
						viewCount: view_count,
						password: savingPassword,
					},
				});

				res.status(200).end('Article has been updated');
				break;
			}

			case 'DELETE': {
				await prisma.article.delete({
					where: {
						id: pid,
					},
				});

				console.log('Article has been deleted');
				res.status(200).end('Article has been deleted successfully');
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
