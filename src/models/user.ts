export class Article {
	static async handleApplyPosting(): Promise<any> {
		try {
			let data = null;

			if (process.env.NODE_ENV === 'development') {
				data = await fetch(
					`${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/articles`,
				);
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
}
