import TraitList from "./TraitList";
import type { CharacterType } from "../../../types/CharacterType";

export default function CharacterTooltipContent({ character }: { character: CharacterType }) {
	const { traits } = character;

	return (
		<div className='flex flex-col space-y-1 items-center'>
			<div className='text-lg font-bold text-center mb-1'>{character.title}</div>

			<TraitList items={traits.behaviour} color='text-yellow-400' prefix='' />
			<TraitList items={traits.buffs} color='text-blue-300' prefix='+ ' />
			<TraitList items={traits.nerfs} color='text-red-300' prefix='- ' />
		</div>
	);
}
