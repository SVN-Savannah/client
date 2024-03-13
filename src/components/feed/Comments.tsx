import { useDeleteComments, useGetComments } from '@/hooks/comment';
import { CommentType, CommentsType } from '@/model/comment';
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Comments({ placeId, feedId }: { placeId: string; feedId: number }) {
	const [activeCommentId, setActiveCommentId] = useState<null | number>(null);

	const { data } = useQuery<CommentsType>(['comments', placeId, feedId], () =>
		useGetComments({ placeId, feedId }),
	);
	const handleOptionClick = (commentId: number) => {
		if (activeCommentId === commentId) {
			setActiveCommentId(null);
		} else {
			setActiveCommentId(commentId);
		}
	};

	const handleDelete = async (commnetId: number) => {
		// @TODO react-query 로 수정 필요
		try {
			useDeleteComments({
				placeId,
				feedId,
				commnetId,
			});
			setActiveCommentId(null);
		} catch (error) {
			console.error('Error deleting the post:', error);
		}
	};

	return (
		<ul className="mx-2 my-3">
			{data?.content.map((comment: CommentType, idx: any) => (
				<li key={idx}>
					<div className="flex items-start justify-between py-1">
						<div>
							<span className="mr-4 min-w-150px text-h4">{comment.user.name}</span>
							<span className="text-body14">{comment.content}</span>
						</div>
						<div className="relative">
							<EllipsisHorizontalIcon
								width={20}
								hanging={20}
								color="black"
								onClick={() => handleOptionClick(comment.commentId)}
								className="cursor-pointer"
							/>
							{activeCommentId === comment.commentId && (
								<div
									onClick={() => handleDelete(comment.commentId)}
									className="absolute right-8 top-0 z-10 flex w-16 cursor-pointer justify-center rounded-md border-2 border-neutral-60 bg-white p-2 shadow-md"
								>
									삭제
								</div>
							)}
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
