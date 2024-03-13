import { useMutation, useQueryClient } from 'react-query';

export const useGetComments = async ({ placeId, feedId }: { placeId: string; feedId: number }) => {
	try {
		const res = await fetch(`/api/feed/comment?place=${placeId}&post=${feedId}`);

		if (res.ok) {
			const data = await res.json();
			return data;
		} else {
			console.error('API 호출 실패:', res.statusText);
		}
	} catch (error) {
		console.error('Failed to create comments:', error);
	}
};

export const useDeleteComments = async ({
	placeId,
	feedId,
	commnetId,
}: {
	placeId: string;
	feedId: number;
	commnetId: number;
}) => {
	try {
		const res = await fetch(
			`/api/feed/comment?place=${placeId}&post=${feedId}&comment=${commnetId}`,
			{
				method: 'DELETE',
			},
		);

		if (!res.ok) {
			console.error('API 호출 실패:', res.statusText);
		}

		console.log('삭제 성공');
	} catch (error) {
		console.error('Failed to create comments:', error);
	}
};

export const usePostComment = () => {
	const queryClient = useQueryClient();

	// const mutation = useMutation(
	// 	async ({ placeId, postId }: { placeId: string; postId: string }) => {
	// 		const res = await fetch(`/api/feed/comment?place=${placeId}&post=${postId}`, {
	// 			method: 'DELETE',
	// 		});
	// 		if (!res.ok) {
	// 			throw new Error('Failed to delete the post.');
	// 		}
	// 		return comments;
	// 	},
	// 	{
	// 		onSuccess: comments => {
	// 			console.log('post??', comments);
	// 			// 게시글 삭제 성공 후 실행될 로직
	// 			// 예를 들어, 'feedList' 쿼리 키를 사용하는 쿼리 데이터를 새로 고침
	// 			queryClient.invalidateQueries(['comments', comments.postId]);
	// 			// router.replace 대신 사용할 수 있으며, 특정 페이지 또는 데이터를 새로 고침
	// 		},
	// 		onError: error => {
	// 			// 에러 처리 로직
	// 			console.error('Error:', error);
	// 		},
	// 	},
	// );

	// return mutation.mutate; // 삭제 로직을 실행하는 함수 반환
};
