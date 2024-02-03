'use client';

import FeedContainer from '@/components/feed/FeedContainer';
import { Place, getPlaceById, usePlacesStore } from '@/store/placesStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FeedDetail() {
	const useUsePlaces = usePlacesStore(state => state.places);
	const params = useParams();
	const [placeInfo, setPlaceInfo] = useState<Place>();
	console.log('params', params.feedId);
	console.log(getPlaceById(params.feedId));
	useEffect(() => {
		const place = getPlaceById(params.feedId);
		setPlaceInfo(place);
	}, [params]);

	return (
		<main className="flex h-full w-full items-start justify-center bg-white">
			<FeedContainer placeInfo={placeInfo} />
		</main>
	);
}
