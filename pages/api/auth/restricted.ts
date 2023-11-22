import { getServerSession } from 'next-auth/next';
import handler from './[...nextauth]';

export default async (req, res) => {
	const session = await getServerSession(req, res, handler);
	if (session) {
		res.send({
			content:
				'This is protected content. You can access this content because you are signed in.',
		});
	} else {
		res.send({
			error:
				'You must be signed in to view the protected content on this page.',
		});
	}
};
