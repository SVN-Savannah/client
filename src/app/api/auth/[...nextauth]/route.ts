import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { Adapter } from 'next-auth/adapters';

const authOptions: NextAuthOptions = {
	providers: [
		KakaoProvider({
			clientId: process.env.KAKAO_CLIENT_ID ?? '',
			clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
		}),
		NaverProvider({
			clientId: process.env.NAVER_CLIENT_ID ?? '',
			clientSecret: process.env.NAVER_CLIENT_SECRET ?? '',
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	adapter: SupabaseAdapter({
		url: process.env.SUPABASE_URL ?? "",
		secret: process.env.SUPABASE_SECRET ?? "",
	}) as Adapter,
	pages: {
		signIn: '/login',
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
