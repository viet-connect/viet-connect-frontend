import { PrismaClient } from '@prisma/client';
import { Posting } from '../src/models/posting';
import { temp } from './view';

const prisma = new PrismaClient();

async function main() {
	// readcount();
	console.log('insert func');
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

async function readcount() {
	const arr = [];
	for (let i = 0; i < temp.length; i += 1) {
		const prop = Object.keys(temp[i])[0];
		const val = temp[i][prop];

		const newprop = prop.replace('{', '');
		arr.push({
			id: newprop,
			count: val,
		});
	}

	const resultArr = [];
	async function fncArrMerge() {
		for (let i = 0; i < arr.length; i += 1) {
			const idx = getKeyIndex(resultArr, arr[i]);
			if (idx > -1) {
				resultArr[idx].count += Number(arr[i].count);
			} else {
				resultArr.push(arr[i]);
			}
		}
	}

	function getKeyIndex(arr2: any, obj) {
		for (let i = 0; i < arr2.length; i += 1) {
			if (arr2[i].id === obj.id) {
				return i;
			}
		}
		return -1;
	}

	await fncArrMerge();

	const promises = [];
	for (let i = 0; i < resultArr.length; i += 1) {
		const uniquePosting = prisma.posting.findUnique({
			where: {
				id: resultArr[i].id,
			},
		});
		promises.push(uniquePosting);
	}

	console.log(promises);

	const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
	const validResults = results.filter((result) => result instanceof Error);
	console.log(results.length, validResults.length);

	for (let i = 0; i < resultArr.length; i += 1) {
		const uniquePosting = prisma.posting
			.findUnique({
				where: {
					id: resultArr[i].id,
				},
			})
			// eslint-disable-next-line no-loop-func, consistent-return
			.then(async (data) => {
				if (data) {
					const { updatedAt } = data;
					await prisma.posting.update({
						where: {
							id: resultArr[i].id,
						},
						data: {
							viewCount: resultArr[i].count,
							updatedAt,
						},
					});
					return data;
				}
			});
	}
}
