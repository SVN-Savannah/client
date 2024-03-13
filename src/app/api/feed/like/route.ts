import { getSessionToken } from '@/server/auth';
import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL ?? 'http://localhost:8080';

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const placeId = searchParams.get('place');
	const postId = searchParams.get('post');
	// const content = await request.json();

	const sessionToken = await getSessionToken();

	const res = await fetch(`${SERVER_URL}/likes/${placeId}/${postId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value ?? 'master-key'}`,
		},
		// body: JSON.stringify(content),
	});

	return NextResponse.json(res);
}
