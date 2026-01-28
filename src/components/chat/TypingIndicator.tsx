export default function TypingIndicator() {
	return (
		<div className={`flex justify-end`}>
			<div className='max-w-[70%] h-12 bg-[#991b1b] items-center justify-center px-4 py-3 rounded-2xl flex gap-1 p-3 text-white wrap-break-word transition-all duration-300'>
				<span className='dot' />
				<span className='dot animation-delay-200' />
				<span className='dot animation-delay-400' />
			</div>
		</div>
	);
}
