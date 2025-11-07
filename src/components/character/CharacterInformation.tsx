export default function CharacterInformation({ age, gender }: { age: number | number[]; gender: boolean }) {
	return (
		<div className='bangers text-2xl font-bold flex px-3 py-2 gap-3 w-full text-stroke-3 text-white'>
			<p className='flex-1 shadow flex items-center  justify-center bg-zinc-800'>{age} lat </p>
			<p className='flex-2  shadow flex items-center justify-center bg-zinc-800'>
				{gender ? (
					<>
						<i className='ri-men-line text-blue-500' />
						<span>Mężczyzna</span>
					</>
				) : (
					<>
						<i className='ri-women-line text-pink-400' />
						<span>Kobieta</span>
					</>
				)}
			</p>
		</div>
	);
}
