import { formatDate } from "./util/date";
import { getSessionToken } from "./auth";

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

type CommentCreateData = {
	placeId: number;
	feedId: number;
	content: string;
};

type CommentUpdateData = {
	placeId: number;
	feedId: number;
	commentId: number;
	content: string;
};

type CommentDeleteData = {
	placeId: number;
	feedId: number;
	commentId: number;
};

const sessionToken = getSessionToken();
const SERVER_URL = 'http://localhost:8080';

async function createComment({
	placeId,
	feedId,
	content,
}: CommentCreateData): Promise<CommentType> {
	const res = await fetch(`${SERVER_URL}/comments/${placeId}/${feedId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value}`,
		},
		body: JSON.stringify({ content }),
	});

	if (!res.ok) {
		throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
	}

	const json: CommentItem = await res.json();

	return {
		updatedAt: formatDate(json.updatedAt),
		createdAt: formatDate(json.createdAt),
		name: json.user.name,
		comment: json.content,
	};
}

async function updateComment({
	placeId,
	feedId,
	commentId,
	content,
}: CommentUpdateData): Promise<CommentType> {
	const res = await fetch(`${SERVER_URL}/comments/${placeId}/${feedId}/${commentId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value}`,
		},
		body: JSON.stringify({ content }),
	});

	if (!res.ok) {
		throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
	}

	const json: CommentItem = await res.json();

	return {
		updatedAt: formatDate(json.updatedAt),
		createdAt: formatDate(json.createdAt),
		name: json.user.name,
		comment: json.content,
	};
}

async function deleteComment({ placeId, feedId, commentId }: CommentDeleteData): Promise<void> {
	const res = await fetch(`${SERVER_URL}/comments/${placeId}/${feedId}/${commentId}`, {
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

export const CommentApi = {
	createComment,
	updateComment,
	deleteComment,
};
