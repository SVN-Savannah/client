import FeedContainer from '@/components/feed/FeedContainer';
import { FeedsApi } from '@/server/FeedsApi';

export default async function FeedsPage() {
	return (
		<main className="flex h-full w-full items-start justify-center bg-white">
			<FeedContainer />
		</main>
	);
}
