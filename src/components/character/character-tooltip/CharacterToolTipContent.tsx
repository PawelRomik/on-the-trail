import TraitList from "./TraitList";
import type { CharacterType } from "../../../types/CharacterType";
import { useTranslation } from "react-i18next";
import baner from "../../../assets/ui/banner_red.png";

export default function CharacterTooltipContent({ character }: { character: CharacterType }) {
	const { traits } = character;
	const { t } = useTranslation();

	return (
		<div className='flex flex-col space-y-1 items-center'>
			<div style={{ backgroundImage: `url(${baner})` }} className='text-lg bg-cover bg-center font-bold w-full shadow text-center mb-1 '>
				{t(`characters.ch${character.id}.title`)}
			</div>

			<p className='w-full text-sm text-yellow-500 italic px-3 font-bold text-center  py-1'>{t(`characters.ch${character.id}.behaviour`)}</p>
			{traits.buffs && (
				<TraitList
					type='buff'
					items={traits.buffs.map((perkId) => ({
						id: perkId,
						name: t(`characters.perks.buffs.${perkId}.name`),
						desc: t(`characters.perks.buffs.${perkId}.desc`)
					}))}
				/>
			)}
			{traits.nerfs && (
				<TraitList
					type='nerf'
					items={traits.nerfs.map((perkId) => ({
						id: perkId,
						name: t(`characters.perks.nerfs.${perkId}.name`),
						desc: t(`characters.perks.nerfs.${perkId}.desc`)
					}))}
				/>
			)}
			{traits.special && (
				<TraitList
					type='special'
					items={traits.special.map((perkId) => ({
						id: perkId,
						name: t(`characters.perks.special.${perkId}.name`),
						desc: t(`characters.perks.special.${perkId}.desc`)
					}))}
				/>
			)}
		</div>
	);
}
