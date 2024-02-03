'use client';

import ModalPortal from '@/components/common/modal/ModalPortal';
import KakaoMap from '@/components/map/KakaoMap';
import KakaoMapListDisplayTest from '@/components/map/KakaoMapListDisplayTest';
import { MarkerList } from '@/components/map/MarkerList';
import { ListBulletIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function MapPage() {
	const [listOpen, setListOpen] = useState(false);
	return (
		<div id="MapPage" className="w-ful relative h-full">
			{/* <KakaoMap /> */}
			<KakaoMapListDisplayTest />
			<button
				type="button"
				className="absolute right-8 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md"
				onClick={() => setListOpen(!listOpen)}
			>
				<ListBulletIcon color="black" width={30} height={30} />
			</button>
			{
				listOpen && createPortal(<MarkerList />, document.body)
				// <ModalPortal>
				// 	<MarkerList />
				// </ModalPortal>
			}
		</div>
	);
}
