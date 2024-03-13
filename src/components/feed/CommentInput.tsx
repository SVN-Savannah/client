import { ArrowUpCircleIcon } from '@heroicons/react/16/solid';
import { useForm } from 'react-hook-form';

export default function CommentInput({ placeId, postId }: { placeId: string; postId: string }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		mode: 'onChange',
	});

	// console.log(`Fetching to: /api/feed/comment?place=${placeId}&post=${postId}`);
	//@TODO content -> comment 로 수정하기
	const onSubmit = async (content: any) => {
		console.log('Request body:', JSON.stringify(content));
		try {
			const res = await fetch(`/api/feed/comment?place=${placeId}&post=${postId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(content),
			});
			if (!res.ok) {
				console.error('API 호출 실패:', res.statusText);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="relative flex w-full">
			<input
				id="content"
				type="text"
				className="mr-2 w-full rounded-md border border-black bg-white p-2 pr-10"
				placeholder="댓글을 작성해 주세요."
				{...register('content')}
				maxLength={140}
			/>
			<button type="submit">
				<ArrowUpCircleIcon
					width={24}
					hanging={24}
					color="black"
					className="absolute right-4 top-2 cursor-pointer"
				/>
			</button>
		</form>
	);
}
