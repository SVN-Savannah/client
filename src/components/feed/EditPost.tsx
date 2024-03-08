'use client';

import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditPost() {
	const router = useRouter();
	const params = useSearchParams();
	const placeId = params?.get('place');
	const postId = params?.get('post');

	// @TODO 타입설정해주고 fetchPost 로 받아온 데이터 넣어서 input 에 표시하기
	const [post, setPost] = useState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// resolver: zodResolver(),
		mode: 'onChange',
	});

	const fetchPost = async () => {
		try {
			const res = await fetch(`/api/feed/post?place=${placeId}&post=${postId}`);
			if (res.ok) {
				const data = await res.json();
				console.log('피드 데이터', data);
				return data;
			} else {
				// 오류 처리
				console.error('API 호출 실패:', res.statusText);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	const onSubmit = async (content: any) => {
		let isFetched = false;
		try {
			const res = await fetch(`/api/feed/post?place=${placeId}&feed=${postId}`, {
				method: 'PUP',
				body: JSON.stringify(content), // 보낼 데이터를 JSON 문자열로 변환
			});
			console.log(res.ok);
			if (res.ok) {
				// const data = await res.json();
				isFetched = true;
			} else {
				console.error('API 호출 실패:', res.statusText);
			}

			if (isFetched) {
				router.push(`/feed/${placeId}`);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	useEffect(() => {
		fetchPost();
	});

	return (
		<section className="h-full w-768px">
			<div className="mb-4 flex h-48px w-full items-center justify-between">
				<ArrowLeftIcon
					width={28}
					height={28}
					color="black"
					onClick={() => router.back()}
					className="cursor-pointer"
				/>
				<h2 className="text-2xl font-bold">{/* @TODO 장소명 표시 */}</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="mb-2 text-[28px] font-bold">유저 닉네임</h3>
				<textarea
					id="content"
					className="h-[60vh] w-full resize-none rounded-lg border border-neutral-100 bg-white p-4 focus:outline-none"
					placeholder="내용을 작성해주세요"
					{...register('content')}
					maxLength={240}
				/>
				<div className="flex justify-end">
					<button
						type="submit"
						className="rounded-lg bg-neutral-100 px-8 py-4 font-bold text-neutral"
					>
						작성 완료
					</button>
				</div>
			</form>
		</section>
	);
}
