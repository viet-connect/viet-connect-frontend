export interface IPosting {
	job_opening_no: number;
	region: string;
	title: string;
	salary: { wage: string; way: number };
	date: string;
}

export class Posting {
	static async getPostingList(): Promise<any> {
		try {
			const result = await fetch(`${process.env.BASE_URL}/api/postings`);
			return result;
		} catch (err) {
			return console.log(err);
		}
	}
}
