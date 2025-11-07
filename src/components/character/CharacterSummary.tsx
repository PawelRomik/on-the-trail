import type { CharacterType } from "../../types/CharacterType";
import CharacterInformation from "./CharacterInformation";
import StressMeter from "./StressMeter";

export default function CharacterSummary({ character }: { character: CharacterType }) {
	const { name, age, gender, stressMeter, color } = character;
	return (
		<div className='flex flex-col py-3 bg-zinc-900 shadow-dark w-full items-center justify-center'>
			<div className='w-full flex items-center justify-center shadow mb-1' style={{ backgroundColor: color }}>
				<h2 style={{ color }} title={name} className='flex gap-1 items-center tracking-wide justify-center bangers text-5xl font-bold stroke-double'>
					{name}
				</h2>
			</div>

			<CharacterInformation age={age} gender={gender} />
			<StressMeter meter={stressMeter} />
		</div>
	);
}
