import { atom } from 'recoil';
import { v1 } from 'uuid';

export const inputPostingState = atom<Array<string>>({
	key: `inputPostingState/${v1}`,
	default: ['', ''],
});
