'use client';

import { useDeletePost } from '@/hooks/post';
import { PostType } from '@/model/post';
import { EllipsisHorizontalIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostReactionBar from './PostReactionBar';
import Comments from './Comments';

export default function SinglePost() {
	const router = useRouter();
	const params = useParams();
	const placeId = params?.placeId;
	const postId = params?.postId;
	const deleteMutation = useDeletePost();

	const [post, setPost] = useState<PostType>();
	const [displayOption, setDisplayOption] = useState(false);
	const [displayComments, setDisplayComments] = useState(true);

	const isCommented = post?.comments.length !== 0;

	const getPost = async () => {
		try {
			const res = await fetch(`/api/feed/post?place=${placeId}&post=${postId}`);

			if (res.ok) {
				const data = await res.json();
				setPost(data);
			} else {
				console.error('API 호출 실패:', res.statusText);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'ODEE 피드 공유하기',
					// text: post?.content,
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
		router.push(`/feed/edit?place=${post?.placeId}&post=${post?.feedId}`);
		try {
			setDisplayOption(false);
		} catch (error) {
			console.error('Error deleting the post:', error);
		}
	};

	const handleDelete = () => {
		try {
			if (post) {
				deleteMutation(post);
				setDisplayOption(false);
			}
		} catch (error) {
			console.error('Error deleting the post:', error);
		}
	};

	useEffect(() => {
		getPost();
	}, []);

	if (!post) {
		return <></>;
	}

	return (
		<article className="rounded-md border-2 border-neutral-60 p-4">
			<div className="relative flex items-center justify-between">
				<div className="flex items-center">
					<UserCircleIcon width={36} hanging={36} color="black" className="mr-3" />
					<span className="">{post?.user.name}</span>
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
				className="px-4 py-10"
				onClick={() => router.push(`/feed/${post?.placeId}/${post?.feedId}`)}
			>
				{post?.content}
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
