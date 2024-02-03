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

const usePlacesStore = create<PlacesState>(set => ({
	places: [],
	setPlaces: (places: Place[]) => set({ places }),
}));

export default usePlacesStore;
