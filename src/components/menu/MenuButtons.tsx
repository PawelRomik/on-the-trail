type MenuButtonsProps = {
	onStart: () => void;
};

export default function MenuButtons({ onStart }: MenuButtonsProps) {
	return (
		<div className='flex flex-col z-10 gap-5 h-[40%] justify-start'>
			<button onClick={onStart} className='px-8 py-3 w-[300px] bg-zinc-600 hover:cursor-pointer hover:bg-red-600 rounded-2xl text-xl font-semibold transition'>
				Start
			</button>
			<button onClick={onStart} className='px-8 py-3 w-[300px] bg-zinc-600 hover:cursor-pointer hover:bg-red-600 rounded-2xl text-xl font-semibold transition'>
				Settings
			</button>
		</div>
	);
}
