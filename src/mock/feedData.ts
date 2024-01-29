export type FeedDataType = {
	name: string;
	content: string;
	comments: CommentType[];
};

export type CommentType = {
	name: string;
	comment: string;
	createdAt: string;
	updatedAt?: string;
};

export const feedData = [
	{
		name: 'nick name1',
		content: '100',
		comments: [
			{
				name: 'comment name1',
				comment:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim impedit quos animi error harum minus temporibus autem adipisci delectus unde earum repellat, architecto obcaecati ipsaeaque sit culpa ipsum labore eligendi itaque?',
				createdAt: '2021-11-12T10:17:12+09:00',
				updatedAt: '2021-11-12T10:17:12+09:00',
			},
			{
				name: 'comment name2',
				comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
			{
				name: 'comment name3',
				comment: 'Enim impedit quos animi error harum minus',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
		],
	},
	{
		name: 'nick name2',
		content: '',
		comments: [],
	},
	{
		name: 'nick name3',
		content: '',
		comments: [
			{
				name: 'comment name1',
				comment: 'Enim impedit quos animi error harum minus',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
			{
				name: 'comment name2',
				comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
			{
				name: 'comment name3',
				comment: 'Lorem ipsum dolor',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
			{
				name: 'comment name3',
				comment:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim impedit quos animi error harum minus temporibus autem adipisci delectus unde earum repellat',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
			{
				name: 'comment name3',
				comment: 'Enim impedit quos animi error harum minus',
				createdAt: '2021-11-12T10:17:12+09:00',
				updatedAt: '2021-11-12T10:17:12+09:00',
			},
		],
	},
	{
		name: 'nick name4',
		content: '',
		comments: [
			{
				name: 'comment name1',
				comment: 'zzzzzzzzzzzzzzzzzzzzzzzzzzz',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
		],
	},
	{
		name: 'nick name5',
		content: '',
		comments: [
			{
				name: 'comment name1',
				comment: 'Enim impedit quos animi error harum minus',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
			{ name: 'comment name2', comment: '222', createdAt: '2021-11-12T10:17:12+09:00' },
			{
				name: 'comment name3',
				comment: '3333333333333333333',
				createdAt: '2021-11-12T10:17:12+09:00',
			},
		],
	},
];
