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
	return (
		<div className="flex w-full">
			<form className="relative flex w-full">
				<CommentInput placeId={placeId} postId={postId} />
			</form>
			<div className="flex items-center">
				<ChatBubbleOvalLeftEllipsisIcon
					width={28}
					hanging={28}
					color="black"
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
				<HeartIcon width={36} hanging={36} color="black" className="mx-1.5 cursor-pointer" />
			</div>
		</div>
	);
}
