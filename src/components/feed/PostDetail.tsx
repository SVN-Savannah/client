'use client';

import { FeedDataType } from '@/mock/feedData';
import {
	ArrowUpCircleIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	EllipsisHorizontalIcon,
	HeartIcon,
	ShareIcon,
	UserCircleIcon,
} from '@heroicons/react/16/solid';
import { useState } from 'react';

type FeedPostProps = {
	post: FeedDataType;
};

export default function PostDetail({ post }: FeedPostProps) {
	const [displayComment, setDisplayComment] = useState(false);
	const [displayOption, setDisplayOption] = useState(false);

	const isCommented = post.comments.length !== 0;
	return (
		<article className="rounded-md border-2 border-neutral-60 p-4">
			<div className="relative flex items-center justify-between">
				<div className="flex items-center">
					<UserCircleIcon width={36} hanging={36} color="black" className="mr-3" />
					<span className="">{post.name}</span>
				</div>
				<div>
					<EllipsisHorizontalIcon
						width={20}
						hanging={20}
						color="black"
						onClick={() => setDisplayOption(!displayOption)}
						className="cursor-pointer"
					/>
				</div>
				{displayOption && (
					<div className="absolute right-0 top-1 rounded-md border-2 border-neutral-60 bg-white p-2 shadow-md">
						<div className="cursor-pointer p-2" onClick={() => setDisplayOption(!displayOption)}>
							수정
						</div>
						<div className="cursor-pointer p-2" onClick={() => setDisplayOption(!displayOption)}>
							삭제
						</div>
					</div>
				)}
			</div>
			<div className="px-4 py-10">{`lorem${post.comments}`}</div>
			<div className="flex w-full">
				<div className="relative flex w-full">
					<input type="text" className="mr-2 w-full rounded-md border border-black bg-white p-2" />
					<ArrowUpCircleIcon
						width={24}
						hanging={24}
						color="black"
						className="absolute right-4 top-2 cursor-pointer"
					/>
				</div>
				<div className="flex items-center">
					<ChatBubbleOvalLeftEllipsisIcon
						width={28}
						hanging={28}
						color="black"
						className={`mx-1.5 ${isCommented && 'cursor-pointer'}`}
						onClick={() => setDisplayComment(!displayComment)}
					/>
					<ShareIcon width={30} hanging={30} color="black" className="mx-1.5 cursor-pointer" />
					<HeartIcon width={36} hanging={36} color="black" className="mx-1.5 cursor-pointer" />
				</div>
			</div>
			{displayComment && isCommented && (
				<ul className="mx-2 my-3">
					{post.comments.map((comment, idx) => (
						<li className="flex items-start py-1" key={idx}>
							<span className="mr-4 min-w-150px text-h4">{comment.name}</span>
							<span className="text-body14">{comment.comment}</span>
						</li>
					))}
				</ul>
			)}
		</article>
	);
}
