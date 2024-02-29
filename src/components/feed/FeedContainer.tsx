'use client';

import { ArrowLeftIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';
import PostDetail from './PostDetail';
import { Place, getPlaceById } from '@/store/placesStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SocialLoginButtons } from '../auth/SocialLoginButtons';
import ModalPortal from '../common/modal/ModalPortal';
import { useSession } from 'next-auth/react';
import { useInfiniteQuery } from 'react-query';
import { FeedsApi } from '@/server/FeedsApi';
import React from 'react';

export default function FeedContainter() {
	const router = useRouter();
	const params = useParams();
	const { status } = useSession();

	const [placeInfo, setPlaceInfo] = useState<Place>();
	const [displayModal, setDisplayModal] = useState(false);

	const fetchPosts = async (pageParam: number) => {
		const data = await FeedsApi.getFeeds(pageParam, 10, 'place1');

		const nextPage = pageParam + 1; // 단순히 현재 페이지 번호에 1을 더함

		// PageData 객체 반환
		return {
			data: data,
			nextPage: data.length ? nextPage : undefined,
		};
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: async ({ pageParam = 0 }) => {
			return fetchPosts(pageParam);
		},
		getNextPageParam: (lastPage, pages) => {
			return lastPage.nextPage;
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

	const onClickCreatePost = () => {
		if (status === 'authenticated') {
			router.push(`/feeds/post/${placeInfo?.id}`);
		} else {
			setDisplayModal(true);
		}
	};

	useEffect(() => {
		if (params) {
			const place = getPlaceById(params.feedId);
			setPlaceInfo(place);
		}
		fetchPosts(1);
	}, [params]);

	return (
		<section className="h-full w-768px">
			<div className="flex h-48px w-full items-center justify-between">
				<ArrowLeftIcon
					width={28}
					height={28}
					color="black"
					onClick={() => router.back()}
					className="cursor-pointer"
				/>
				<div className="flex items-center">
					<h2 className="mr-2 text-2xl font-bold">{placeInfo?.place_name ?? '서울역'}</h2>
					<PlusCircleIcon
						width={28}
						height={28}
						color="black"
						onClick={onClickCreatePost}
						className="cursor-pointer"
					/>
				</div>
			</div>
			<div>
				<ul className="h-[90vh] overflow-auto scrollbar-hide">
					{data?.pages.map((page, i) => (
						<React.Fragment key={i}>
							{page.data.map(post => (
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
							<p>No more posts</p>
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
