'use client';

import {
	ArrowUpCircleIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	EllipsisHorizontalIcon,
	HeartIcon,
	ShareIcon,
	UserCircleIcon,
} from '@heroicons/react/16/solid';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SinglePost() {
	// const searchParams = useSearchParams();
	// const placeId = searchParams.get('place');
	// const postId = searchParams.get('post');
	const params = useParams();
	const placeId = params.placeId;
	const postId = params.postId;

	const [postData, setPostDate] = useState<any>();

	const getPost = async () => {
		try {
			const res = await fetch(`/api/feed/post?place=${placeId}&post=${postId}`);
			// const res = await fetch(`/api/${placeId}/${postId}`);

			if (res.ok) {
				const data = await res.json();
				setPostDate(data);
			} else {
				// 오류 처리
				console.error('API 호출 실패:', res.statusText);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	useEffect(() => {
		getPost();
	}, []);

	return (
		<article className="rounded-md border-2 border-neutral-60 p-4">
			{/* <div>{postData?.content}</div>
			<div className="relative flex items-center justify-between">
				<div className="flex items-center">
					<UserCircleIcon width={36} hanging={36} color="black" className="mr-3" />
					<span className="">{postData?.}</span>
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
			<div
				className="px-4 py-10"
				// onClick={() => router.push(`/feed?place=${placeId}&=post${postData.feedId}`)}
				onClick={() =>
					router.push(`/feed/${postData.feedId}?place=${placeId}&post=${postData.feedId}`)
				}
			>
				{content}
			</div>
			<div className="flex w-full">
				<div className="relative flex w-full">
					<input
						type="text"
						className="mr-2 w-full rounded-md border border-black bg-white p-2 pr-10"
						maxLength={140}
					/>
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
			{displayComment && isCommented && (
				<ul className="mx-2 my-3">
					{postData.comments.map((comment, idx) => (
						<li className="flex items-start py-1" key={idx}>
							<span className="mr-4 min-w-150px text-h4">{comment.name}</span>
							<span className="text-body14">{comment.comment}</span>
						</li>
					))}
				</ul>
			)} */}
		</article>
	);
}
