import { XMarkIcon } from '@heroicons/react/16/solid';

type ButtonType = {
	text: string;
	type: string;
	action?: () => void;
};
type ModalLayout = {
	buttons?: ButtonType[];
	message?: string;
	onClose: () => void;
};

export default function ModalLayout({ message, buttons, onClose }: ModalLayout) {
	return (
		<div className="flex w-[26rem] flex-col items-center justify-center rounded-lg bg-neutral-10">
			<div className="flex w-full justify-end p-4 pb-0" onClick={onClose}>
				<XMarkIcon width={20} height={20} color="black" className="cursor-pointer" />
			</div>
			<div className="flex w-full justify-center px-6 py-5">
				<p>{message}</p>
			</div>
			<div className="flex w-full justify-center p-6 pt-4">
				{buttons &&
					buttons.map((button, index) => (
						<button key={index} onClick={button.action} className="mr-2">
							{button.text}
						</button>
					))}
			</div>
		</div>
	);
}
