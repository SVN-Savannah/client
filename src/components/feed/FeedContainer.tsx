"use client"

import { ArrowLeftIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';
import PostDetail from './PostDetail';
import { Place, getPlaceById } from '@/store/placesStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SocialLoginButtons } from '../auth/SocialLoginButtons';
import ModalPortal from '../common/modal/ModalPortal';
import { useSession } from 'next-auth/react';
import { FeedDataType } from '@/mock/feedData';

type FeedContainterProps = {
	feedData: FeedDataType[];
};

export default function FeedContainter({ feedData }: FeedContainterProps) {
	const router = useRouter();
	const params = useParams();
	const { status } = useSession();

	const [placeInfo, setPlaceInfo] = useState<Place>();
	const [displayModal, setDisplayModal] = useState(false);

	const onClickCreatePost = () => {
		if (status === 'authenticated') {
			router.push(`/feeds/post/${placeInfo?.id}`);
		} else {
			setDisplayModal(true);
		}
	};

	useEffect(() => {
		const place = getPlaceById(params.feedId);
		setPlaceInfo(place);
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
					<h2 className="mr-2 text-2xl font-bold">{placeInfo?.place_name}</h2>
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
				<ul className="h-860px overflow-auto scrollbar-hide">
					{feedData.map((post, idx) => (
						<li key={idx} className="mb-4">
							<PostDetail post={post} />
						</li>
					))}
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
