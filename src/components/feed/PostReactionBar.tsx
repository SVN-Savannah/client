import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon, ShareIcon } from '@heroicons/react/16/solid';
import CommentInput from './CommentInput';

export default function PostReactionBar({
	placeId,
	postId,
	handleShare,
	handleDisplayComments,
	isCommented,
}: {
	placeId: string;
	postId: string;
	handleShare: () => void;
	handleDisplayComments: () => void;
	isCommented: boolean;
}) {
	// @TODO like 상태 확인 필요
	const toggleLike = async () => {
		try {
			const res = await fetch(`/api/feed/like?place=${placeId}&post=${postId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				// body: JSON.stringify(content),
			});
			console.log('res', res);
			if (!res.ok) {
				console.error('API 호출 실패:', res.statusText);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	return (
		<div className="flex w-full">
			<CommentInput placeId={placeId} postId={postId} />
			<div className="flex items-center">
				<ChatBubbleOvalLeftEllipsisIcon
					width={28}
					hanging={28}
					color={`${isCommented ? '#000' : '#eee'}`}
					className={`mx-1.5 ${isCommented && 'cursor-pointer'}`}
					onClick={handleDisplayComments}
				/>
				<ShareIcon
					width={30}
					hanging={30}
					color="black"
					className="mx-1.5 cursor-pointer"
					onClick={handleShare}
				/>
				<HeartIcon
					width={36}
					hanging={36}
					color="black"
					// color={`${isLiked ? '#000' : '#eee'}`}
					className="mx-1.5 cursor-pointer"
					onClick={toggleLike}
				/>
			</div>
		</div>
	);
}
