import useSearchStore from '@/store/searchStore';
import { useForm } from 'react-hook-form';
export default function SearchForm() {
	const setSearchKeyword = useSearchStore(state => state.setKeyword);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		mode: 'onChange',
	});

	const searchKeyword = watch('search');

	const onSubmit = (data: any) => {
		setSearchKeyword(data.search);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				id="search"
				type="search"
				value={searchKeyword}
				className="mr-2 w-96 rounded-lg border-2 border-black bg-white p-2 text-black focus:outline-none"
				{...register('search')}
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
