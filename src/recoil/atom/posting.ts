import { atom } from 'recoil';
import { v1 } from 'uuid';
import { IPosting, ISavedPosting } from '../../models/posting';

export const inputPostingState = atom<IPosting>({
  key: `inputPostingState/${v1}`,
  default: {
    title: '',
    contact_name: '',
    contact_number: '',
    wage_type: 'monthly',
    wage_amount: '',
    gender: null,
    proficiency: null,
    working_day: [],
    is_day_negotiable: false,
    starting_time: '09:00',
    ending_time: '18:00',
    is_time_negotiable: false,
    contents: '',
    address: {
      full: '',
      main: '',
      sub: '',
    },
    password: '',
    view_count: 0,
    authorId: '',
  },
});

export const savedInputPostingState = atom<ISavedPosting>({
  key: `savedInputPostingState/${v1}`,
  default: {
    title: '',
    contactName: '',
    contactNumber: '',
    wageType: '',
    wageAmount: '',
    gender: 0,
    proficiency: 0,
    workingDay: '',
    isDayNegotiable: true,
    startingTime: '',
    endingTime: '',
    isTimeNegotiable: true,
    contents: '',
    address: '',
    password: '',
    updatedAt: null,
    createdAt: null,
    subAddress: '',
    mainAddress: '',
    viewCount: 0,
  },
});
