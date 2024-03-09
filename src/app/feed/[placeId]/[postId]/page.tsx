import FeedNavigationToolbar from '@/components/feed/FeedNavigationToolbar';
import SinglePost from '@/components/feed/SinglePost';

export default async function SinglePostPage() {
	return (
		<main className="flex h-full w-full items-start justify-center bg-white">
			<section className="h-full w-768px">
				<FeedNavigationToolbar />
				<SinglePost />
			</section>
		</main>
	);
}
