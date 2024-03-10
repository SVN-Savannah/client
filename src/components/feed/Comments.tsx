import { useGetComments } from '@/hooks/comment';
import { PostType } from '@/model/post';
import { useQuery } from 'react-query';

export default function Comments({ placeId, feedId }: { placeId: string; feedId: number }) {
	// const {
	// 	data: comments,
	// 	error,
	// 	isLoading,
	// 	isError,
	// } = useQuery(['comments', feedId], () => useGetComments({ placeId, feedId }));
	// console.log('comments???', comments);
	return (
		<div>
			<ul className="mx-2 my-3">
				{/* {comments.map((comment, idx) => (
					<li className="flex items-start py-1" key={idx}>
						<span className="mr-4 min-w-150px text-h4">{comment.user.name}</span>
						<span className="text-body14">{comment.content}</span>
					</li>
				))} */}
			</ul>
		</div>
	);
}
