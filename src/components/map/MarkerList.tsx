import { usePlacesStore } from '@/store/placesStore';
import { useRouter } from 'next/navigation';

export function MarkerList() {
	const router = useRouter();
	const places = usePlacesStore(state => state.places);

	return (
		<div className="color-black absolute right-8 top-36 z-10 h-[70%] w-400px overflow-auto rounded-lg bg-white px-10 py-8 scrollbar-hide">
			<ul>
				{places.length > 0 ? (
					places.map((place, idx) => (
						<li
							key={place.id}
							className={`${
								places.length !== idx + 1 && 'border-b border-neutral-15'
							} cursor-pointer p-4`}
							onClick={() => router.push(`/feed/${place.id}`)}
						>
							<div className="text-h2">{place.place_name}</div>
							<div className="text-body12">{place.address_name}</div>
							{/* <div>{place.phone}</div> */}
						</li>
					))
				) : (
					<div>@TODO 리스트가 없을 때 리스트 표시하는 토글 버튼을 비활성화 시키기</div>
				)}
			</ul>
		</div>
	);
}
