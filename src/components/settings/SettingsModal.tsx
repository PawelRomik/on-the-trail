import { type ReactNode } from "react";
import stone from "../../assets/ui/stone.png";

type SettingsModalProps = {
	title: string;
	children: ReactNode;
	onClose: () => void;
};

export default function SettingsModal({ title, children, onClose }: SettingsModalProps) {
	return (
		<div onClick={(e) => e.target === e.currentTarget && onClose()} className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
			<div style={{ backgroundImage: `url(${stone})` }} className='shadow-red-900  relative w-full bg-size-[100%] max-w-lg  text-white p-6 rounded-2xl shadow-md space-y-6'>
				<button onClick={onClose} className='absolute top-4 right-4 text-red-800 cursor-pointer hover:text-red-600 transition text-xl'>
					<i className='ri-close-circle-line'></i>
				</button>

				<h1 className='text-3xl border-b-2 border-red-800 pb-2 bg-[rgba(0,0,0,0.4)] border-t-0 rounded-full w-auto font-bold text-center'>{title}</h1>

				{children}
			</div>
		</div>
	);
}
