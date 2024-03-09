export type CommentType = {
	name: string;
	comment: string;
	createdAt: string;
	updatedAt?: string;
};

export type CommentItem = {
	commentId: number;
	content: string;
	updatedAt: number[];
	createdAt: number[];
	deleted: true;
	user: {
		userId: string;
		name: string;
	};
};
