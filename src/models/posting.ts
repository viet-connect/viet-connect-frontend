export interface IMockPosting {
	job_opening_no: number;
	region: string;
	title: string;
	salary: { wage: string; way: number };
	date: string;
}

export interface IPosting {
	title: string;
	contact_name: string;
	contact_number: string;
	wage_type: string;
	wage_amount: string;
	gender: Optional<number>;
	proficiency: number;
	working_day: Array<number>;
	is_day_negotiable: boolean;
	starting_time: string;
	ending_time: string;
	is_time_negotiable: boolean;
	contents: string;
	address: {
		full: string;
		main: string;
		sub: string;
	};
	author: string;
	password: string;
	createdAt: number;
}

export class Posting {
	static async getPostingList(): Promise<any> {
		try {
			const result = await fetch(`${process.env.VERCEL_URL}/api/postings`);

			return result;
		} catch (err) {
			return console.log(err);
		}
	}
}
