import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';
import { IUser } from '../../../src/models/user';

export const newUserInfo = (_fields: Partial<IUser> = {}) => {
  const { phone: _phone = '', ...fields } = _fields;
  const phone = _phone.replace(/[^0-9]/g, '');
  const value = {
    name: '',
    nation: null,
    gender: null,
    birth: '',
    phone,
    proficiency: '',
    career: '',
    careerDetail: '',
    residenceType: '',
    selfIntroduction: '',
    ...fields,
  };
  return value;
};

export default async function user(_req: NextApiRequest, res: NextApiResponse) {
  const { method } = _req;
  const {
    query: { slug },
  } = _req;

  try {
    switch (method) {
      case 'GET': {
        const uid = slug[0];
        const currentUser = await prisma.user.findUnique({
          where: { id: uid },
        });
        const {
          name,
          image,
          nation,
          gender,
          birth,
          phone,
          proficiency,
          career,
          careerDetail,
          residenceType,
          selfIntroduction,
        } = currentUser;
        res.status(200).json({
          name,
          image,
          nation,
          gender,
          birth,
          phone,
          proficiency,
          career,
          careerDetail,
          residenceType,
          selfIntroduction,
        });
        break;
      }
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
        const { id, ...info } = _req.body;
        const currentUser = await prisma.user.findUnique({
          where: { id },
        });
        await prisma.user.update({
          where: { id },
          data: { ...currentUser, ...newUserInfo(info) },
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
