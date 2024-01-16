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
		<button
			onClick={() => {
				signIn(providerId, {
					redirect: true,
					callbackUrl: '/',
				});
			}}
		>
			<Image
				className="h-[47px] w-[337px] flex-shrink-0 rounded-[8px 8px 8px 8px]"
				src={imageUrl}
				alt={altText}
			/>
		</button>
	);
};
