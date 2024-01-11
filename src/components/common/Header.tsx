'use client';

import Image from 'next/image';
import logo from '@/public/icon/logo.svg';
import { QuestionMarkCircleIcon } from '@heroicons/react/16/solid';
import { UserIcon } from '@heroicons/react/16/solid';
import { useSession } from 'next-auth/react';

export function Header() {
	const { status } = useSession();

	return (
		<div className="flex w-full items-center justify-between bg-white px-4 py-2">
			<Image src={logo} alt="star" className="mb-0.5 text-white" />
			<div>
				<input type="text" className="mr-2 w-96 rounded-lg border-2 border-black bg-white p-2" />
				<button className="text-h2 rounded-lg border-2 border-black px-4 py-2 text-black">
					SEARCH
				</button>
			</div>
			{status === 'authenticated' ? (
				<UserIcon width={42} height={42} color="black" />
			) : (
				<QuestionMarkCircleIcon width={42} height={42} color="black" />
			)}
		</div>
	);
}
