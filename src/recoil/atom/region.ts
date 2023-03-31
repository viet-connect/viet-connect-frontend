import { atom } from 'recoil';
import { v1 } from 'uuid';

export const selectedRegionState = atom<Array<string>>({
	key: `selectedRegionState/${v1}`,
	default: ['', ''],
});
