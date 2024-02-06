'use client';

import Image, { StaticImageData } from 'next/image';
import { signIn } from 'next-auth/react';

type LoginProps = {
	providerId: string;
	imageUrl: StaticImageData;
	altText: string;
};

export const LoginButton = ({ providerId, imageUrl, altText }: LoginProps) => {
	return (
		<button>
			<Image width={42} height={42} src={imageUrl} alt={altText} className="mr-10" />
		</button>
		// <button
		// 	className="mb-2 flex items-center rounded-lg border border-neutral-15 px-12 py-2 text-body12 hover:bg-neutral-15"
		// 	onClick={() => {
		// 		signIn(providerId, {
		// 			redirect: true,
		// 			callbackUrl: '/',
		// 		});
		// 	}}
		// >
		// 	<Image width={24} height={24} src={imageUrl} alt={altText} className="mr-10" />
		// 	<span>Sign in with {altText}</span>
		// </button>
	);
};
