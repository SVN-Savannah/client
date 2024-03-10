import { getSessionToken } from '@/server/auth';
import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL ?? 'http://localhost:8080';

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
