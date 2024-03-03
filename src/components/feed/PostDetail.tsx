'use client';

import { FeedDataType } from '@/model/feed';
import {
	ArrowUpCircleIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	EllipsisHorizontalIcon,
	HeartIcon,
	ShareIcon,
	UserCircleIcon,
} from '@heroicons/react/16/solid';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type FeedPostProps = {
	post: FeedDataType;
};

export default function PostDetail({ post }: FeedPostProps) {
	const router = useRouter();
	// const params = useSearchParams();
	// const placeId = params.get('place');
	const params = useParams();
	const placeId = params.placeId;
	console.log('post', post);
	const [displayComment, setDisplayComment] = useState(false);
	const [displayOption, setDisplayOption] = useState(false);

	const isCommented = post.comments.length !== 0;
	const content = post.content.substring(0, 70) + (post.content.length > 70 ? '...' : ''); // 글자 수 제한

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'ODEE 피드 공유하기',
					text: content,
					url: window.location.href,
				});
			} catch (error) {
				console.error('Error sharing content', error);
			}
		} else {
			alert('사용 중인 브라우저에서 공유하기 기능을 지원하지 않습니다.');
		}
	};

	const deletePost = async () => {
		console.log('????');
		try {
			const res = await fetch(`/api/feed/post?place=${post.placeId}&post=${post.feedId}`, {
				method: 'DELETE', // HTTP 메서드 지정
			});

			if (res.ok) {
				// 추가적인 성공 처리 로직 (예: 상태 업데이트, 사용자에게 알림 등)
				console.log('Post deleted successfully');
				setDisplayOption(false);
			} else {
				// 서버 응답이 OK가 아닌 경우, 에러 처리
				throw new Error('Failed to delete the post.');
			}
		} catch (error) {
			console.error('Error:', error);
			// 에러 처리 로직
		}
	};

	return (
		<article className="rounded-md border-2 border-neutral-60 p-4">
			<div className="relative flex items-center justify-between">
				<div className="flex items-center">
					<UserCircleIcon width={36} hanging={36} color="black" className="mr-3" />
					<span className="">{post.user.name}</span>
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
					<div className="absolute right-0 top-1 z-10 rounded-md border-2 border-neutral-60 bg-white p-2 shadow-md">
						<div className="cursor-pointer p-2" onClick={() => setDisplayOption(!displayOption)}>
							수정
						</div>
						<div className="cursor-pointer p-2" onClick={() => deletePost()}>
							삭제
						</div>
					</div>
				)}
			</div>
			<div
				className="cursor-pointer px-4 py-10"
				// onClick={() => router.push(`/feed?place=${placeId}&=post${post.feedId}`)}
				// onClick={() => router.push(`/feed/${post.feedId}?place=${placeId}&post=${post.feedId}`)}
				onClick={() => router.push(`/feed/${placeId}/${post.feedId}`)}
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
