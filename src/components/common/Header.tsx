'use client';

import Image from 'next/image';
import logo from '@/public/icon/logo.svg';
import { UserIcon } from '@heroicons/react/16/solid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';
import SearchForm from './SearchForm';
import { useState } from 'react';
import ModalPortal from './modal/ModalPortal';
import { SocialLoginButtons } from '../auth/SocialLoginButtons';

export function Header() {
	const router = useRouter();
	const { status } = useSession();

	const [modal, setModal] = useState(false);
	return (
		<div className="flex w-full items-center justify-between border border-b-black bg-white px-4 py-2">
			<Image
				src={logo}
				alt="logo"
				onClick={() => router.push('/')}
				className="mb-0.5 cursor-pointer text-white"
			/>
			<SearchForm />
			{status === 'authenticated' ? (
				<UserIcon width={42} height={42} color="black" />
			) : (
				<QuestionMarkCircleIcon
					width={42}
					height={42}
					color="black"
					onClick={() => setModal(true)}
					className="cursor-pointer"
				/>
			)}
			{modal && (
				<ModalPortal>
					<div className="flex w-340px flex-col items-center justify-center rounded-lg bg-neutral-10">
						<div className="flex w-full justify-end p-4 pb-0" onClick={() => setModal(false)}>
							<XMarkIcon width={20} height={20} color="black" className="cursor-pointer" />
						</div>
						<div className="flex w-full px-6 py-5 text-black">
							<p className="text-h1">
								안녕하세요
								<br /> 오디에 오신걸 환영해요:{')'}
							</p>
						</div>
						<div className="flex w-full flex-col justify-center p-6 pt-4">
							<p className="mb-2 text-body12 text-neutral-40">3초만에 시작하기</p>
							<SocialLoginButtons />
						</div>
					</div>
				</ModalPortal>
			)}
		</div>
	);
}
