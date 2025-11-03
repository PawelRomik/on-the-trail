type CharacterDescriptionProps = {
	character: {
		desc: string;
	};
	x: number;
	y: number;
};

export default function CharacterDescription({ character, x, y }: CharacterDescriptionProps) {
	return (
		<div className='absolute bg-black  text-white p-2 rounded shadow-lg text-sm z-50 pointer-events-none max-w-xs' style={{ top: y + 10, left: x + 10 }}>
			{character.desc}
		</div>
	);
}
