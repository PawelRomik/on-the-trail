import { type ReactNode } from "react";

type SettingsModalProps = {
	title: string;
	children: ReactNode;
	onClose: () => void;
};

export default function SettingsModal({ title, children, onClose }: SettingsModalProps) {
	return (
		<div onClick={(e) => e.target === e.currentTarget && onClose()} className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
			<div className='relative w-full max-w-lg bg-zinc-900 text-white p-6 rounded-2xl shadow-xl space-y-6'>
				<button onClick={onClose} className='absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-white text-xl'>
					✕
				</button>

				<h1 className='text-3xl font-bold text-center'>{title}</h1>

				{children}
			</div>
		</div>
	);
}
