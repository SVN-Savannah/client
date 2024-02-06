'use client';

import { Place, getPlaceById } from '@/store/placesStore';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CreatePost() {
	const router = useRouter();
	const params = useParams();

	const [placeInfo, setPlaceInfo] = useState<Place>();

	useEffect(() => {
		const place = getPlaceById(params.feedId);
		setPlaceInfo(place);
	}, [params]);
	return (
		<section className="h-full w-768px">
			<div className="flex h-48px w-full items-center justify-between">
				<ArrowLeftIcon
					width={28}
					height={28}
					color="black"
					onClick={() => router.back()}
					className="cursor-pointer"
				/>
				<h2 className="text-2xl font-bold">{placeInfo?.place_name}</h2>
			</div>
			<div>
				<div className="mb-4">유저 닉네임</div>
				<textarea
					name=""
					id=""
					className="h-420px w-full resize-none rounded-lg border border-neutral-100 bg-white p-4 focus:outline-none"
				></textarea>
				<div className="flex justify-end">
					<button
						type="button"
						className="rounded-lg bg-neutral-100 px-4 py-2 text-neutral"
						onClick={() => router.push(`/feeds/${params.feedId}`)}
					>
						작성 완료
					</button>
				</div>
			</div>
		</section>
	);
}
