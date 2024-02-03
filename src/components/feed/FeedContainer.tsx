import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import FeedPost from './FeedPost';
import { feedData } from '@/mock/feedData';
import { Place } from '@/store/placesStore';
import { useRouter } from 'next/navigation';

interface PlaceInfoProps {
	placeInfo: Place | undefined;
}

const FeedContainter: React.FC<PlaceInfoProps> = ({ placeInfo }) => {
	const router = useRouter();
	return (
		<section className="h-full w-768px">
			<div className="flex h-48px w-full items-center justify-between">
				<ArrowLeftIcon
					width={20}
					height={20}
					color="black"
					onClick={() => router.back()}
					className="cursor-pointer"
				/>
				<h2 className="text-2xl font-bold">{placeInfo?.place_name}</h2>
			</div>
			<div>
				<ul className="h-860px overflow-auto scrollbar-hide">
					{feedData.map((post, idx) => (
						<li key={idx} className="mb-4">
							<FeedPost post={post} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default FeedContainter;
