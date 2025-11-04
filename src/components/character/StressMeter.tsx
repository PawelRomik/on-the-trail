export default function StressMeter({ meter }: { meter: number }) {
	const markers = [0, 25, 50, 75, 100];

	return (
		<div className='relative  w-[200px]'>
			<div className='bg-black w-full h-7 p-1 rounded-full overflow-hidden relative'>
				<div className='bg-red-500 h-full rounded-full' style={{ width: `${meter}%` }}></div>
				<div className='absolute top-0 left-0 w-full h-7 flex justify-between items-start pointer-events-none'>
					{markers.map((m) => (
						<div key={m} className='relative'>
							<div className='w-0.5 h-7 bg-[rgba(0,0,0,0.3)]'></div>
						</div>
					))}
				</div>
				<p className='absolute text-stroke-3 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold bangers'>Stres: {meter}%</p>
			</div>
		</div>
	);
}
