'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EllipsisHorizontalIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { PostType } from '@/model/post';
import { useDeletePost } from '@/hooks/post';
import PostReactionBar from './PostReactionBar';
import Comments from './Comments';

type PostDetailProps = {
	post: PostType;
};

export default function PostDetail({ post }: PostDetailProps) {
	const router = useRouter();
	const deleteMutation = useDeletePost();

	const [displayComments, setDisplayComments] = useState(false);
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

	const handleDisplayComments = () => {
		setDisplayComments(!displayComments);
	};

	const handleEdit = () => {
		setDisplayOption(false);
		router.push(`/feed/edit?place=${post.placeId}&post=${post.feedId}`);
		try {
			setDisplayOption(false);
		} catch (error) {
			console.error('Error deleting the post:', error);
		}
	};

	const handleDelete = () => {
		try {
			deleteMutation(post);
			setDisplayOption(false);
		} catch (error) {
			console.error('Error deleting the post:', error);
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
						<div className="cursor-pointer p-2" onClick={handleEdit}>
							수정
						</div>
						<div className="cursor-pointer p-2" onClick={handleDelete}>
							삭제
						</div>
					</div>
				)}
			</div>
			<div
				className="cursor-pointer px-4 py-10"
				onClick={() => router.push(`/feed/${post.placeId}/${post.feedId}`)}
			>
				{content}
			</div>
			<PostReactionBar
				placeId={post.placeId}
				postId={String(post.feedId)}
				handleShare={handleShare}
				handleDisplayComments={handleDisplayComments}
				isCommented={isCommented}
			/>
			{displayComments && isCommented && <Comments placeId={post.placeId} feedId={post.feedId} />}
		</article>
	);
}
