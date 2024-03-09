'use client';
import { Place, getPlaceById } from '@/store/placesStore';
import { ArrowLeftIcon, PlusCircleIcon } from '@heroicons/react/16/solid';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FeedNavigationToolbar({ isBack = true }: { isBack?: boolean }) {
	const router = useRouter();
	const params = useParams();
	const placeId = params?.placeId;
	const [placeInfo, setPlaceInfo] = useState<Place>();

	const onClickCreatePost = () => {
		router.push(`/feed/create?place=${placeId}`);
		// if (status === 'authenticated') {
		// 	router.push(`/feeds/post/${placeInfo?.id}`);
		// } else {
		// 	setDisplayModal(true);
		// }
	};

	useEffect(() => {
		if (placeId) {
			const place = getPlaceById(placeId);
			setPlaceInfo(place);
		}
	}, []);

	return (
		<div className="flex h-48px w-full items-center justify-between">
			<ArrowLeftIcon
				width={28}
				height={28}
				color="black"
				onClick={() => router.push(`/feed/${placeId}`)}
				className={`cursor-pointer ${!isBack && 'invisible'}`}
			/>
			<div className="flex items-center">
				<h2 className="mr-2 text-2xl font-bold">{placeInfo?.place_name ?? '서울역'}</h2>
				<PlusCircleIcon
					width={28}
					height={28}
					color="black"
					onClick={onClickCreatePost}
					className="cursor-pointer"
				/>
			</div>
		</div>
	);
}
