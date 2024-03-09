'use client';

import { XMarkIcon } from '@heroicons/react/16/solid';
import PostDetail from './PostDetail';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { SocialLoginButtons } from '../auth/SocialLoginButtons';
import ModalPortal from '../common/modal/ModalPortal';
import { useInfiniteQuery } from 'react-query';
import React from 'react';
import FeedNavigationToolbar from './FeedNavigationToolbar';

export default function FeedContainter() {
	const params = useParams();
	const placeId = params?.placeId;

	const [displayModal, setDisplayModal] = useState(false);

	const fetchPosts = async (pageParam: number) => {
		try {
			const res = await fetch(`/api/feed?place=${placeId}&page=${pageParam}`);
			if (res.ok) {
				const data = await res.json();

				return {
					data: data.content,
					nextPage: data.content.length > 0 ? pageParam + 1 : undefined,
				};
			} else {
				console.error('API 호출 실패:', res.statusText);
			}
		} catch (error) {
			console.error('Failed to create feed:', error);
		}
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['posts', placeId],
		queryFn: ({ pageParam = 1 }) => {
			return fetchPosts(pageParam);
		},
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.nextPage;
		},
	});

	const observer = React.useRef<IntersectionObserver | null>(null);

	const lastPostElementRef = React.useCallback(
		(node: any) => {
			if (isFetchingNextPage) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});
			if (node) observer.current.observe(node);
		},
		[isFetchingNextPage, fetchNextPage, hasNextPage],
	);

	return (
		<section className="h-full w-768px">
			<FeedNavigationToolbar isBack={false} />
			<div>
				<ul className="h-[80vh] overflow-auto scrollbar-hide">
					{data?.pages.map((page, i) => (
						<React.Fragment key={i}>
							{page?.data.map((post: any) => (
								<li key={post.feedId} className="mb-4">
									<PostDetail post={post} />
								</li>
							))}
						</React.Fragment>
					))}
					<div ref={hasNextPage ? lastPostElementRef : undefined}>
						{isFetchingNextPage ? (
							<p>Loading more...</p>
						) : hasNextPage ? (
							<p>Scroll to load more</p>
						) : (
							<p></p>
						)}
					</div>
				</ul>
			</div>
			{displayModal && (
				<ModalPortal>
					<div className="flex w-340px flex-col items-center justify-center rounded-lg bg-neutral-10">
						<div
							className="flex w-full justify-end p-4 pb-0"
							onClick={() => setDisplayModal(false)}
						>
							<XMarkIcon width={20} height={20} color="black" className="cursor-pointer" />
						</div>
						<div className="flex w-full px-6 py-5 text-black">
							<p className="text-h1">
								로그인이
								<br /> 필요한 작업입니다:{')'}
							</p>
						</div>
						<div className="flex w-full flex-col justify-center p-6 pt-4">
							<p className="mb-2 text-body12 text-neutral-40">3초만에 시작하기</p>
							<SocialLoginButtons />
						</div>
					</div>
				</ModalPortal>
			)}
		</section>
	);
}
