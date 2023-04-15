import { atom } from 'recoil';
import { v1 } from 'uuid';
import { IPosting } from '../../models/posting';

export const inputPostingState = atom<IPosting>({
	key: `inputPostingState/${v1}`,
	default: {
		title: '',
		contact_name: '',
		contact_number: '',
		wage_type: 'hourly',
		wage_amount: '',
		gender: null,
		proficiency: null,
		working_day: [],
		is_day_negotiable: false,
		starting_time: 0,
		ending_time: 0,
		is_time_negotiable: false,
		contents: '',
		address: '',
		author: '',
		password: '',
		createdAt: 0,
	},
});
