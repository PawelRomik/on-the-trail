export default function StressMeter({ meter }: { meter: number }) {
	const markers = [0, 25, 50, 75, 100];

	return (
		<div className='relative  w-full  px-3 '>
			<div className='bg-zinc-850 shadow w-full h-7 p-0.5 overflow-hidden relative'>
				<div className='bg-red-600 h-full shadow-red' style={{ width: `${meter}%` }}></div>
				<div className='absolute top-0 left-0 w-full h-10 flex justify-between items-start pointer-events-none'>
					{markers.map((m) => (
						<div key={m} className='relative'>
							<div className='w-0.5 h-7 bg-[rgba(0,0,0,0.3)]'></div>
						</div>
					))}
				</div>
				<p className='absolute text-stroke-3 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold bangers'>Stres: {meter}%</p>
			</div>
		</div>
	);
}
