export interface IMockPosting {
	job_opening_no: Number;
	region: string;
	title: string;
	salary: { wage: string; way: Number };
	date: string;
}

export interface IPosting {
	title: string;
	contact_name: string;
	contact_number: string;
	wage_type: string;
	wage_amount: string;
	gender: Optional<Number>;
	proficiency: Number;
	working_day: Array<Number>;
	is_day_negotiable: boolean;
	starting_time: Number;
	ending_time: Number;
	is_time_negotiable: boolean;
	contents: string;
	address: string;
	author: string;
	password: string;
	createdAt: Number;
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
