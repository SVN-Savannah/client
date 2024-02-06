'use client';

import btn_google from '@/public/icon/btn_google.svg';
import btn_naver from '@/public/icon/btn_naver.svg';
import btn_kakao from '@/public/icon/btn_kakao.svg';
import { LoginButton } from '@/components/auth/LoginButton';
import { signIn, signOut } from 'next-auth/react';
import { LogoutButton } from './LogoutButton';
import Image from 'next/image';

export const SocialLoginButtons = () => {
	return (
		<div className="flex w-full flex-col items-center justify-between">
			<button
				type="button"
				onClick={() => {
					signIn('naver', {
						redirect: true,
						callbackUrl: '/',
					});
				}}
				className="mb-2 flex w-full items-center rounded-sm bg-[#04c75a] px-4"
			>
				<Image width={42} height={42} src={btn_naver} alt="naver" className="mr-14" />
				<span className="text-body12 text-neutral">네이버로 시작하기</span>
			</button>
			<button
				type="button"
				onClick={() => {
					signIn('kakao', {
						redirect: true,
						callbackUrl: '/',
					});
				}}
				className="mb-2 flex w-full items-center rounded-sm bg-[#fee500] px-4"
			>
				<Image width={42} height={42} src={btn_kakao} alt="kakao" className="mr-14" />
				<span className="text-body12 text-[#181600]">카카오로 시작하기</span>
			</button>
			<button
				type="button"
				onClick={() => {
					signIn('google', {
						redirect: true,
						callbackUrl: '/',
					});
				}}
				className="flex w-full items-center rounded-sm border p-2 px-4"
			>
				<Image width={24} height={24} src={btn_google} alt="google" className="ml-2 mr-16" />
				<span className="text-body12 text-neutral-100">구글로 시작하기</span>
			</button>
			{/* {loginOptions.map((option, index) => (
				<LoginButton
					key={index}
					providerId={option.providerId}
					imageUrl={option.imageUrl}
					altText={option.altText}
				/>
			))}
			<LogoutButton /> */}
		</div>
	);
};
