// export type CommentType = {
// 	name: string;
// 	comment: string;
// 	createdAt: string;
// 	updatedAt?: string;
// };

// export type CommentType = {
// 	commentId: number;
// 	content: string;
// 	updatedAt: number[];
// 	createdAt: number[];
// 	deleted: true;
// 	user: {
// 		userId: string;
// 		name: string;
// 	};
// };

export type CommentType = {
	feedId: number;
	commentId: number;
	content: string;
	updatedAt: string;
	deleted: true;
	user: {
		userId: string;
		name: string;
	};
};

export type CommentsType = {
	totalPages: number;
	totalElements: number;
	size: number;
	content: CommentType[];
	number: number;
	sort: {
		empty: true;
		sorted: true;
		unsorted: true;
	};
	pageable: {
		offset: number;
		sort: {
			empty: true;
			sorted: true;
			unsorted: true;
		};
		pageNumber: number;
		pageSize: number;
		unpaged: true;
		paged: true;
	};
	numberOfElements: number;
	first: true;
	last: true;
	empty: true;
};
