/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/lib/prisma';
import { Password } from '../../src/utils/bcrypt';
import { SHOW_CONTENTS } from '../../src/constant/page';
import region from '../../src/constant/region';

interface PostingListParams {
	postingPage?: string
	keyword?: string
	mainRegion?: string
	subRegion?: string
}

interface PostingListOptions {
	orderBy?: {[key: string]: string}[]
	skip?: number
	take?: number
	where?: object
}

export default async function posting_list(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const { method, query = {} } = _req;
	try {
		switch (method) {
			case 'GET': {
				const { postingPage = '1', keyword = '', mainRegion: mRegion, subRegion = '' } = query as PostingListParams;
				const page = parseInt(postingPage, 10) - 1;
				const skip = Number.isNaN(page) ? 0 : page * SHOW_CONTENTS;
				const [mainRegion = ''] = mRegion ? region[mRegion].province : [];
				const isFilterInvalid = [keyword, mainRegion, subRegion].every((filter) => filter.length === 0);
				const where = {
					AND: [
						{ title: { contains: keyword } },
						{ address: { contains: mainRegion } },
					],
					OR: [
						{ address: { contains: subRegion } },
					],
				};
				const options: PostingListOptions = {
					orderBy: [
						{
							updatedAt: 'desc',
						},
					],
					skip,
					take: SHOW_CONTENTS,
				};
				if (!isFilterInvalid) options.where = where;
				const postingList = await prisma.posting.findMany(options);
				const totalPostings = await prisma.posting.count({ where });
				const totalPages = Math.ceil(totalPostings / SHOW_CONTENTS);

				res.status(200).json({ postingList, totalPages });
				break;
			}

			case 'POST': {
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

				const passwordHelper = new Password(password, '');
				const hashedPassword = await passwordHelper.createPassword();

				await prisma.posting.create({
					data: {
						title,
						contactName: contact_name,
						contactNumber: contact_number,
						wageType: wage_type,
						wageAmount: wage_amount,
						gender,
						proficiency,
						workingDay: JSON.stringify(working_day),
						isDayNegotiable: is_day_negotiable,
						startingTime: starting_time,
						endingTime: ending_time,
						isTimeNegotiable: is_time_negotiable,
						contents,
						address: address.full,
						mainAddress: address.main,
						subAddress: address.sub,
						password: hashedPassword,
						viewCount: 0,
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
