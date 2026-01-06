type VolumeSliderProps = {
	id: string;
	label: string;
	value: number;
	onChange: (value: number) => void;
};

export default function VolumeSlider({ id, label, value, onChange }: VolumeSliderProps) {
	const percent = value;

	const backgroundStyle = {
		background: `linear-gradient(to right, #991b1b 0%, #991b1b ${percent}%, #111 ${percent}%, #000 100%)`
	};

	return (
		<div className='flex flex-col'>
			<label htmlFor={id} className='mb-2 font-medium'>
				{label}
			</label>
			<input
				id={id}
				type='range'
				min={0}
				max={100}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className='w-full cursor-grab h-2 rounded-lg appearance-none'
				style={backgroundStyle}
			/>
		</div>
	);
}
