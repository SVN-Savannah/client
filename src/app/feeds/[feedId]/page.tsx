import FeedContainer from '@/components/feed/FeedContainer';
import { FeedsApi } from '@/server/FeedsApi';

export default async function FeedDetail() {

	const feeds = await FeedsApi.getFeeds(1, 10, "place1");

	return (
		<main className="flex h-full w-full items-start justify-center bg-white">
			<FeedContainer feedData={feeds}  />
		</main>
	);
}
