import { create } from 'zustand';

export interface Place {
	address_name: string;
	category_group_code: string;
	category_group_name: string;
	category_name: string;
	distance: string;
	id: string;
	phone: string;
	place_name: string;
	place_url: string;
	x: string;
	y: string;
}

interface PlacesState {
	places: Place[];
	setPlaces: (list: Place[]) => void;
}

export const usePlacesStore = create<PlacesState>(set => ({
	places: [],
	setPlaces: (places: Place[]) => set({ places }),
}));

export const getPlaceById = (id: string | string[] | undefined): Place | undefined => {
	// usePlacesStore 훅을 통해 현재의 places 상태를 가져옵니다.
	const { places } = usePlacesStore.getState();

	// id 값이 일치하는 Place를 찾아서 반환합니다.
	return places.find(place => place.id === id);
};

// export default { usePlacesStore, getPlaceById };
