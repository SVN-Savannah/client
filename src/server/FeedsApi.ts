import { CommentType, CommentItem } from './CommentApi';
import { formatDate } from './util/date';
import { getSessionToken } from './auth';

export type FeedDataType = {
    feedId: number;
	name: string;
	content: string;
	comments: CommentType[];
};

type FeedItem = {
	user: {
		userId: string;
		name: string;
	};
	placeId: string;
	feedId: number;
	content: string;
	view: number;
	updatedAt: number[];
	deleted: boolean;
	comments: CommentItem[];
};

type FeedsServerResType = {
	totalPages: number;
	totalElements: number;
	size: number;
	content: FeedItem[];
	number: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	pageable: {
		offset: number;
		sort: {
			empty: boolean;
			sorted: boolean;
			unsorted: boolean;
		};
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		unpaged: boolean;
	};
	numberOfElements: number;
	first: boolean;
	last: boolean;
	empty: boolean;
};

type FeedCreateData = {
	placeId: number;
	content: string;
};

type FeedUpdateData = {
	placeId: number;
	feedId: number;
	content: string;
};

type FeedDeleteData = {
	placeId: number;
	feedId: number;
};

const sessionToken = getSessionToken();
const SERVER_URL = 'http://localhost:8080';

async function getFeeds(page: number = 0, size: number = 10, placeId: string): Promise<FeedDataType[]> {
	const res = await fetch(`${SERVER_URL}/feeds/${placeId}?page=${page}&size=${size}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value}`,
		},
	});


	if (!res.ok) {
		throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
	}

	const json: FeedsServerResType = await res.json();

	return json.content.map(entity => {
		return {
            feedId: entity.feedId,
			name: entity.user.name,
			content: entity.content,
			comments: entity.comments.map(comment => {return {
                updatedAt: formatDate(comment.updatedAt),
                createdAt: formatDate(comment.createdAt),
                name: comment.user.name,
                comment: comment.content,
            }}),
		};
	});
}

async function createFeed({ placeId, content }: FeedCreateData): Promise<FeedDataType> {
	const res = await fetch(`${SERVER_URL}/feeds/${placeId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value}`,
		},
		body: JSON.stringify({
			content,
		}),
	});

	if (!res.ok) {
		throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
	}

	const json: FeedItem = await res.json();

	return {
        feedId: json.feedId,
		name: json.user.name,
		content: json.content,
        comments: json.comments.map(comment => {return {
            updatedAt: formatDate(comment.updatedAt),
            createdAt: formatDate(comment.createdAt),
            name: comment.user.name,
            comment: comment.content,
        }}),
	};
}

async function updateFeed({ placeId, feedId, content }: FeedUpdateData): Promise<FeedDataType> {
	const res = await fetch(`${SERVER_URL}/feeds/${placeId}/${feedId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value}`,
		},
		body: JSON.stringify({
			content,
		}),
	});

	if (!res.ok) {
		throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
	}

	const json: FeedItem = await res.json();

	return {
        feedId: json.feedId,
		name: json.user.name,
		content: json.content,
        comments: json.comments.map(comment => {return {
            updatedAt: formatDate(comment.updatedAt),
            createdAt: formatDate(comment.createdAt),
            name: comment.user.name,
            comment: comment.content,
        }}),
	};
}

async function deleteFeed({ placeId, feedId }: FeedDeleteData): Promise<void> {
	const res = await fetch(`${SERVER_URL}/feeds/${placeId}/${feedId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value}`,
		},
	});

	if (!res.ok) {
		throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
	}
}

export const FeedsApi = {
	getFeeds,
	createFeed,
	updateFeed,
	deleteFeed,
};
