'use client';

import { Place, getPlaceById } from '@/store/placesStore';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function CreatePost() {
	const router = useRouter();
	const params = useParams();

	const [placeInfo, setPlaceInfo] = useState<Place>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// resolver: zodResolver(),
		mode: 'onChange',
	});

	const onSubmit = async (data: any) => {
		const response = await fetch('/api/feeds', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: data,
			}),
		});
		const responseData = await response.json(); // 서버로부터 응답 받기
		console.log('onSubmit responseData::', responseData);
		// if (response.feedId) {
		// 	router.push(`/feeds/${response.feedId}`);
		// }
	};

	useEffect(() => {
		if (params) {
			const place = getPlaceById(params.feedId);
			setPlaceInfo(place);
		}
	}, [params]);

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
				<h2 className="text-2xl font-bold">{placeInfo?.place_name ?? '서울역'}</h2>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="mb-6 text-[28px] font-bold">유저 닉네임</h3>
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
						// onClick={() => router.push(`/feeds/${params.feedId}`)}
					>
						작성 완료
					</button>
				</div>
			</form>
		</section>
	);
}
