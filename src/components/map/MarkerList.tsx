import useLocationsStore from '@/store/placesStore';

export function MarkerList() {
	const places = useLocationsStore(state => state.places);
	console.log('이거 맞는지 확ㅇ니', places);
	return (
		<div className="color-black absolute right-8 top-36 z-10 h-[70%] w-[50%] rounded-lg bg-white">
			<ul>
				{places.map(place => (
					<li key={place.id}>
						<div>{place.place_name}</div>
						<div>{place.address_name}</div>
						<div>{place.phone}</div>
					</li>
				))}
			</ul>
		</div>
	);
}
