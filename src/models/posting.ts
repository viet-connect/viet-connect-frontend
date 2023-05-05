import { isNaN } from 'lodash';
import validate from '../utils/validate';

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
}

export class Posting {
	static async getPostingList(): Promise<any> {
		try {
			const result = await fetch(
				`${process.env.HOST}${process.env.VERCEL_URL}/api/postings`,
			);

			return result;
		} catch (err) {
			return console.log(err);
		}
	}

	static async handleNewPost(content: IPosting): Promise<any> {
		try {
			await fetch(
				`${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/postings`,
				{
					method: 'POST',
					body: JSON.stringify(content),
					headers: {
						'content-type': 'application/json',
					},
				},
			);
		} catch (err) {
			console.log(err);
		}
	}

	static validateNewPost(content) {
		const error = {
			title: '',
			contact_name: '',
			contact_number: '',
			starting_time: '',
			ending_time: '',
			proficiency: '',
			wage_amount: '',
			working_day: '',
			address: '',
			gender: '',
			hasSpecialChar: '',
			author: '',
			password: '',
		};
		const {
			title,
			contact_name,
			contact_number,
			starting_time,
			ending_time,
			proficiency,
			address: { full },
			wage_amount,
			working_day,
			gender,
			author,
		} = content;

		const contentArr: any = Object.entries(content);
		for (let i = 0; i < contentArr.length; i += 1) {
			if (contentArr[i][0] === 'password' || contentArr[i][0] === 'contents') {
				// eslint-disable-next-line no-continue
				continue;
			}

			if (
				typeof contentArr[i][1] === 'string' &&
				validate.hasSpecialCharacters(contentArr[i][1])
			) {
				console.log(contentArr[i], '특수문자에러');
				error.hasSpecialChar = '특수문자는 허용되지 않습니다.';
				break;
			}
		}

		if (!validate.isPasswordValid(content.password)) {
			error.password = '패스워드 조건에 맞게 다시 설정해주세요';
		}

		if (author.length === 0) error.author = '작성자를 입력해주세요';
		if (title.length === 0) error.title = '공고제목을 입력해주세요';
		if (contact_name.length === 0) error.contact_name = '업체명을 입력해주세요';

		if (contact_number.length === 0) {
			error.contact_number = '연락처를 입력해주세요';
		} else if (contact_number.length < 9 && contact_number.length > 0) {
			error.contact_number = '유효한 연락처가 아닙니다.';
		} else if (isNaN(Number(contact_number))) {
			error.contact_number = '연락처는 숫자로 입력해주세요';
		}
		if (starting_time.length === 0) {
			error.contact_name = '시작시간을 입력해주세요';
		}
		if (ending_time.length === 0) {
			error.contact_name = '종료시간을 입력해주세요';
		}
		if (proficiency === null) error.proficiency = '한국어 수준을 입력해주세요';
		if (wage_amount.length === 0) error.wage_amount = '급여액을 입력해주세요';
		else if (!isNaN(Number(wage_amount))) {
			error.wage_amount = '급여액은 숫자로 입력해주세요.';
		}

		if (working_day.length === 0) error.working_day = '근무일을 선택해주세요';
		if (full.length === 0) error.address = '주소를 입력해주세요';
		if (gender === null) error.gender = '성별을 선택해주세요';

		const errVal = Object.values(error);
		let errExist = false;
		for (let i = 0; i <= errVal.length - 1; i += 1) {
			if (errVal[i].length > 0) {
				errExist = true;
				break;
			}
		}

		if (errExist) {
			return error;
		}

		return errExist;
	}
}
