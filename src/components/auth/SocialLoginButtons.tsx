'use client';

import GoogleLoginButtonImg from '@/public/images/google/png@4x/light/web_light_sq_SU@4x.png';
import KakaoLoginButtonImg from '@/public/images/kakao/kakao_login_large_narrow.png';
import NaverLoginButtonImg from '@/public/images/naver/btnG_완성형.png';
import { LoginButton } from '@/components/auth/LoginButton';
import { signOut } from 'next-auth/react';
import { LogoutButton } from './LogoutButton';

const loginOptions = [
	{
		providerId: 'kakao',
		imageUrl: KakaoLoginButtonImg,
		altText: 'Kakao Login',
	},
	{
		providerId: 'naver',
		imageUrl: NaverLoginButtonImg,
		altText: 'Naver Login',
	},
	{
		providerId: 'google',
		imageUrl: GoogleLoginButtonImg,
		altText: 'Google Login',
	},
];

export const SocialLoginButtons = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			{loginOptions.map((option, index) => (
				<LoginButton
					key={index}
					providerId={option.providerId}
					imageUrl={option.imageUrl}
					altText={option.altText}
				/>
			))}
			<LogoutButton />
		</div>
	);
};
