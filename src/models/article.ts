export interface IArticle {
	author: string;
	contents: string;
	category: number;
	created_at: Date;
	updated_at: Date;
	password: string;
	title: string;
	view_count: number;
}

export class Article {}
