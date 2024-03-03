import { CommentItem } from '@/server/CommentApi';
import { getSessionToken } from '@/server/auth';
import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL ?? 'http://localhost:8080';

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

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const placeId = searchParams.get('place');
	const page = searchParams.get('page');

	const sessionToken = await getSessionToken();

	const res = await fetch(`${SERVER_URL}/feeds/${placeId}?page=${page}&size=5`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value ?? 'master-key'}`,
		},
	});

	const data = await res.json();
	return new Response(JSON.stringify(data));
}

// export async function POST(request: Request) {
// 	const { searchParams } = new URL(request.url);
// 	const placeId = searchParams.get('place');
// 	const content = await request.json();

// 	const sessionToken = await getSessionToken();

// 	const res = await fetch(`${SERVER_URL}/feeds/${placeId}`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `SESSIONID ${sessionToken?.value ?? 'master-key'}`,
// 		},
// 		body: JSON.stringify(content),
// 	});
// 	console.log('api 호출 결과', res);

// 	return NextResponse.json(res);
// }
