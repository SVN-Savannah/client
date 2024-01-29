import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import FeedPost from './FeedPost';
import { feedData } from '@/mock/feedData';

export default function FeedContainer() {
	return (
		<section className="h-full w-768px">
			<div className="flex h-48px w-full items-center justify-between">
				<ArrowLeftIcon width={20} height={20} color="black" />
				<h2 className="text-2xl font-bold">Feed Name</h2>
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
}
