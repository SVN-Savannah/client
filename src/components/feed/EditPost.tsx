'use client';

import { PostType } from '@/model/post';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FeedNavigationToolbar from './FeedNavigationToolbar';

export default function EditPost() {
	const router = useRouter();
	const params = useSearchParams();
	const placeId = params?.get('place');
	const postId = params?.get('post');

	const [post, setPost] = useState<PostType>();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		mode: 'onChange',
	});

	const fetchPost = async () => {
		try {
			const res = await fetch(`/api/feed/post?place=${placeId}&post=${postId}`);
			if (res.ok) {
				const data = await res.json();
				setValue('content', data.content);
				setPost(data);
			} else {
				console.error('API 호출 실패:', res.statusText);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	const onSubmit = async (content: any) => {
		let isFetched = false;
		try {
			const res = await fetch(`/api/feed/post?place=${placeId}&post=${postId}`, {
				method: 'PUT',
				body: JSON.stringify(content), // 보낼 데이터를 JSON 문자열로 변환
			});
			if (res.ok) {
				isFetched = true;
			} else {
				console.error('API 호출 실패:', res.statusText);
			}

			if (isFetched) {
				router.push(`/feed/${placeId}/${postId}`);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	useEffect(() => {
		fetchPost();
	}, []);

	return (
		<section className="h-full w-768px">
			<FeedNavigationToolbar />
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="mb-2 text-[28px] font-bold">{post?.user.name}</h3>
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
