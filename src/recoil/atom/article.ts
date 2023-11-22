import { atom } from 'recoil';
import { v1 } from 'uuid';
import { IArticle } from '../../models/article';

export const initialArticleState = {
    author: '비엣커넥트',
    title: '',
    contents: '',
    category: 'none',
    password: 'vietconnectPassword',
    // viewCount: 0,
    // imgUrl: ''
};

export const articleState = atom<IArticle>({
	key: `inputPostingState/${v1}`,
	default: initialArticleState,
});
