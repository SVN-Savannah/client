import useSearchStore from '@/store/searchStore';
import { SetStateAction, useState } from 'react';
export default function SearchForm() {
	const [keyword, setKeyword] = useState('');
	const searchKeyword = useSearchStore(state => state.setKeyword);
	const handleSearch = (e: { preventDefault: () => void }) => {
		searchKeyword(keyword);
		e.preventDefault();
	};

	const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
		setKeyword(e.target.value);
	};
	return (
		<form onSubmit={handleSearch}>
			<input
				type="text"
				value={keyword}
				onChange={handleChange}
				className="mr-2 w-96 rounded-lg border-2 border-black bg-white p-2 text-black focus:outline-none"
			/>
			<button
				type="submit"
				className="rounded-lg border-2 border-black bg-white px-4 py-2 text-h2 text-black"
			>
				SEARCH
			</button>
		</form>
	);
}
