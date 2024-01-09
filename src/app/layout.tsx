import type { Metadata } from 'next';
import '../styles/globals.css';
import Script from 'next/script';
import { Noto_Sans_KR } from 'next/font/google';
import { Header } from '@/components/common/Header';

const notoSansKr = Noto_Sans_KR({
	subsets: ['latin'],
	weight: ['100', '400', '700', '900'],
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${notoSansKr.className} scrollbar-hide h-screen overflow-hidden`}>
				<Script
					strategy="beforeInteractive"
					src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.PUBLIC_MAP_KEY}&autoload=false`}
				/>
				<Header />
				{children}
			</body>
		</html>
	);
}
