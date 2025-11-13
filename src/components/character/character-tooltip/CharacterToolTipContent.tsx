import TraitList from "./TraitList";
import type { CharacterType } from "../../../types/CharacterType";
import { useTranslation } from "react-i18next";

export default function CharacterTooltipContent({ character }: { character: CharacterType }) {
	const { traits } = character;
	const { t } = useTranslation();

	return (
		<div className='flex flex-col space-y-1 items-center'>
			<div className='text-lg font-bold w-full shadow text-center mb-1' style={{ backgroundColor: character.color }}>
				{t(`characters.ch${character.id}.title`)}
			</div>

			<p className='w-full text-sm text-yellow-500 font-bold text-center  py-1'>{t(`characters.ch${character.id}.traits.behaviour`)}</p>
			<TraitList items={traits.buffs.map((_, i) => t(`characters.ch${character.id}.traits.buffs.${i}`))} color='rgb(0,255,255,0.4)' prefix='+ ' />

			<TraitList items={traits.nerfs.map((_, i) => t(`characters.ch${character.id}.traits.nerfs.${i}`))} color='rgb(255,0,0,0.4)' prefix='- ' />
		</div>
	);
}
