import StressMeter from "./StressMeter";

type CharacterProps = {
	character: {
		id: number;
		name: string;
		age: number;
		stressMeter: number;
		color: string;
		gender: boolean;
		desc: string;
	};
};

export default function Character({ character }: CharacterProps) {
	const characterImage = `../assets/character/ch${character.id}.png`;

	return (
		<div className='flex-1 flex flex-col items-center justify-center'>
			<img src={characterImage} alt={character.name} />
			<div className='flex flex-col items-center justify-center w-[200px]'>
				<h2 style={{ color: character.color }} className='bangers text-3xl font-bold text-stroke-3 '>
					{character.name}
				</h2>
				<p className='bangers text-xl font-bold text-stroke-3 text-white'>Age: {character.age}</p>
				<StressMeter meter={character.stressMeter} />
			</div>
		</div>
	);
}
