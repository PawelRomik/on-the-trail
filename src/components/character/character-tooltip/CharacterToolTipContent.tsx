import TraitList from "./TraitList";
import type { CharacterType } from "../../../types/CharacterType";

export default function CharacterTooltipContent({ character }: { character: CharacterType }) {
	const { traits } = character;

	return (
		<div className='flex flex-col space-y-1 items-center'>
			<div className='text-lg font-bold w-full shadow text-center mb-1' style={{ backgroundColor: character.color }}>
				{character.title}
			</div>

			<p className='w-full text-sm text-yellow-500 font-bold text-center  py-1'>{traits.behaviour}</p>
			<TraitList items={traits.buffs} color='rgb(0,255,255,0.4)' prefix='+ ' />
			<TraitList items={traits.nerfs} color='rgb(255,0,0,0.4)' prefix='- ' />
		</div>
	);
}
