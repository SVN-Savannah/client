type BackGround = {
	children: React.ReactNode;
	closePortal?: () => void;
};

export default function BackGround({ children, closePortal }: BackGround) {
	return (
		<div
			className="fixed left-0 top-0 z-50 h-full w-full bg-neutral-100 bg-opacity-20"
			onClick={closePortal}
		>
			{children}
		</div>
	);
}
