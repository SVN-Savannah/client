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

	const commentValue = watch('comment');
	console.log('댓글 입력값 확ㅇ니', commentValue);

	const onSubmit = async (data: any) => {
		try {
			const res = await fetch(`/api/feed/comment?place=${placeId}&post=${postId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ comment: data.comment }),
			});
			if (res.ok) {
			} else {
				console.error('API 호출 실패:', res.statusText);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="relative flex w-full">
			<input
				id="comment"
				type="text"
				value={commentValue}
				className="mr-2 w-full rounded-md border border-black bg-white p-2 pr-10"
				maxLength={140}
				{...register('comment')}
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
