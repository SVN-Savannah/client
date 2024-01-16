import { createPortal } from 'react-dom';
import BackGround from './Background';

type ModalPortal = {
	children: React.ReactNode;
	closePortal?: () => void;
};

export default function ModalPortal({ children, closePortal }: ModalPortal) {
	return createPortal(
		<BackGround closePortal={closePortal}>
			<div className="flex h-full w-full items-center justify-center">{children}</div>
		</BackGround>,
		document.body,
	);
}
