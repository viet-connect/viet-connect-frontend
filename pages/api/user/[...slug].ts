import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function user(_req: NextApiRequest, res: NextApiResponse) {
  const { method } = _req;
  const {
    query: { slug },
  } = _req;

  try {
    switch (method) {
      case 'POST': {
        const postId = slug[0];
        const userId = slug[1];

        const currentUser = await prisma.user.findUnique({
          where: { id: userId },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { ...currentUser, postings: { connect: { id: postId } } },
        });

        res.status(200).json({ message: 'apply update' });
        break;
      }

      case 'PUT': {
        const { id, phone: _phone, ...info } = _req.body;
        const currentUser = await prisma.user.findUnique({
          where: { id },
        });

        const phone = _phone.replace(/[^0-9]/g, '');
        await prisma.user.update({
          where: { id },
          data: { ...currentUser, ...info, phone },
        });

        res.status(200).json({ message: 'user info update' });
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
