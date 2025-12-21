type VolumeSliderProps = {
	id: string;
	label: string;
	value: number;
	onChange: (value: number) => void;
};

export default function VolumeSlider({ id, label, value, onChange }: VolumeSliderProps) {
	return (
		<div className='flex flex-col'>
			<label htmlFor={id} className='mb-2 font-medium'>
				{label}
			</label>
			<input id={id} type='range' min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className='w-full' />
		</div>
	);
}
