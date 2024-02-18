import FeedContainer from '@/components/feed/FeedContainer';
import { FeedsApi } from '@/server/FeedsApi';

export default async function feedsPage() {
	const feeds = await FeedsApi.getFeeds(1, 10, "place1");
	console.log(feeds)
	return (
		<main className="flex h-full w-full items-start justify-center bg-white">
			{/* @TODO 검색 내용(마커리스트) 표시? */}
			<FeedContainer feedData={feeds} />
		</main>
	);
}
