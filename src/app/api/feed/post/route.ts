import { getSessionToken } from '@/server/auth';
import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL ?? 'http://localhost:8080';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const placeId = searchParams.get('place');
	const postId = searchParams.get('post');

	const sessionToken = await getSessionToken();

	const res = await fetch(`${SERVER_URL}/feeds/${placeId}/${postId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value ?? 'master-key'}`,
		},
	});

	const data = await res.json();
	return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const placeId = searchParams.get('place');
	const content = await request.json();

	const sessionToken = await getSessionToken();

	const res = await fetch(`${SERVER_URL}/feeds/${placeId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value ?? 'master-key'}`,
		},
		body: JSON.stringify(content),
	});

	return NextResponse.json(res);
}

//@TODO 수정중/사용불가
export async function PUT(request: Request) {
	const { searchParams } = new URL(request.url);
	const placeId = searchParams.get('place');
	const content = await request.json();

	const sessionToken = await getSessionToken();

	const res = await fetch(`${SERVER_URL}/feeds/${placeId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `SESSIONID ${sessionToken?.value ?? 'master-key'}`,
		},
		body: JSON.stringify(content),
	});

	return NextResponse.json(res);
}

//@TODO 수정중/사용불가
export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const placeId = searchParams.get('place');
	const postId = searchParams.get('post');

	const sessionToken = await getSessionToken();

	const res = await fetch(`${SERVER_URL}/feeds/${placeId}/${postId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `SESSIONID ${sessionToken?.value ?? 'master-key'}`,
		},
	});

	console.log('delete 호출 응답', res);
	return NextResponse.json(res);
}
