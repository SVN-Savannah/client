import { SupabaseAdapter } from '@auth/supabase-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { cookies } from 'next/headers'
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
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
	adapter: PrismaAdapter(prisma) as Adapter,
	pages: {
		signIn: '/login',
	},
};

export const getServerAuthSession = () => getServerSession(authOptions);

export const getSessionToken = () =>{
    const cookieStore = cookies()
    return cookieStore.get('next-auth.session-token')
}
