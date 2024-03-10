import { CommentType } from './comment';

export type PostType = {
	feedId: number;
	placeId: string;
	content: string;
	viewCount: number;
	updatedAt: string;
	deleted: boolean;
	user: {
		userId: string;
		name: 'string';
	};
	comments: CommentType[];
};
