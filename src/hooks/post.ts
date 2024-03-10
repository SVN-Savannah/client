import { useMutation, useQueryClient } from 'react-query';

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation(
		async (post: { placeId: unknown | string; feedId: any }) => {
			const res = await fetch(`/api/feed/post?place=${post.placeId}&post=${post.feedId}`, {
				method: 'DELETE',
			});
			if (!res.ok) {
				throw new Error('Failed to delete the post.');
			}
			return post;
		},
		{
			onSuccess: post => {
				console.log('post??', post);
				queryClient.invalidateQueries(['posts', post.placeId]);
			},
			onError: error => {
				console.error('Error:', error);
			},
		},
	);

	return mutation.mutate;
};
