'use client';

import FeedContainer from '@/components/feed/FeedContainer';
import { feedData } from '@/mock/feedData';
import { Place, getPlaceById, usePlacesStore } from '@/store/placesStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FeedDetail() {
	return (
		<main className="flex h-full w-full items-start justify-center bg-white">
			<FeedContainer feedData={feedData}  />
		</main>
	);
}
