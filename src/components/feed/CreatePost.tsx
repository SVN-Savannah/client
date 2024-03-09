'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import FeedNavigationToolbar from './FeedNavigationToolbar';

export default function CreatePost() {
	const router = useRouter();
	const params = useSearchParams();
	const placeId = params?.get('place');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
	});

	const onSubmit = async (content: any) => {
		let isFetched = false;
		try {
			const res = await fetch(`/api/feed/post?place=${placeId}`, {
				method: 'POST',
				body: JSON.stringify(content),
			});
			if (res.ok) {
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

	return (
		<section className="h-full w-768px">
			<FeedNavigationToolbar />
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
