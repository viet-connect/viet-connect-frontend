export interface IArticle {
    // id: string
    author: string
    title: string
    contents: string
    category: string
    password: string
    // viewCount: number
    // imgUrl: Array<string>
}

export class Article {
	static async getArticleList(): Promise<any> {
		try {
			let data = null;

			if (process.env.NODE_ENV === 'development') {
				data = await fetch(`${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/articles`);
			}

			if (process.env.NODE_ENV === 'production') {
				const server = process.env.DEPLOY_URL;
				data = await fetch(`${server}/api/articles`);
			}

			return data.json();
		} catch (err) {
			return console.log(err);
		}
	}

	static async getUniqueArticle(id: string): Promise<any> {
		try {
			const server =
				process.env.NODE_ENV === 'development'
					? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
					: process.env.DEPLOY_URL;
			const post = await fetch(`${server}/api/article/${id}`).then((res) =>
				res.json(),
			);
			// 조회수 1 추가
			post.viewCount += 1;

			return post;
		} catch (err) {
			return console.error(err);
		}
	}

    static async addArticle(article: IArticle): Promise<any> {
        try {
			const server =
				process.env.NODE_ENV === 'development'
					? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
					: process.env.DEPLOY_URL;
			await fetch(`${server}/api/articles`, {
				method: 'POST',
				body: JSON.stringify(article),
				headers: {
					'content-type': 'application/json',
				},
			});
		} catch (err) {
			console.log(err);
		}
    }

	// TODO: 삭제 기능
	// static async deleteArticle(id: string) {
	// 	try {
	// 		const server =
	// 			process.env.NODE_ENV === 'development'
	// 				? `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}`
	// 				: process.env.DEPLOY_URL;
	// 		await fetch(`${server}/api/article/${id}`, {
	// 			method: 'DELETE',
	// 			headers: {
	// 				'content-type': 'application/json',
	// 			},
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// }
}
