/*
TODO: faker 의존성 삭제하기

npm i faker
npm i --save-dev @types/faker

*/

import { faker } from '@faker-js/faker';

function comment(n: number) {
	const lists = [];
	for (let i = 0; i < n; i++) {
		lists.push({
			name: faker.person.fullName(),
			comment: faker.lorem.sentence(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
		});
	}
	return lists;
}

function feed(n: number) {
	const lists = [];
	for (let i = 0; i < n; i++) {
		lists.push({
			feedId: n,
			name: faker.person.fullName(),
			content: faker.lorem.sentence(),
			comments: comment(n),
		});
	}
	return lists;
}

export const GenerateMockData = {
	comment,
  feed
};
