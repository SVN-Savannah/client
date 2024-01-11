import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
	return (
		<button
			className="
            font-notosanskr 
            h-[20px] 
            w-[177px] 
            text-center 
            text-[14px] 
            font-normal 
            leading-[20px] 
            tracking-[-0.24px] 
            text-white 
            opacity-40"
			onClick={() => signOut()}
		>
			로그아웃
		</button>
	);
};
