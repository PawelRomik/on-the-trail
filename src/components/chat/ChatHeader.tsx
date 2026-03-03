import { useTranslation } from "react-i18next";
import { type CharacterType } from "../../types/CharacterType";
import ChatCloseButton from "./ChatCloseButton";
import TraitList from "../character/character-tooltip/TraitList";
import StressMeter from "../character/StressMeter";

type ChatHeaderProps = {
	character: CharacterType;
	onClose: () => void;
};

export default function ChatHeader({ character, onClose }: ChatHeaderProps) {
	const { t } = useTranslation();
	const traitsSource = character?.actorTraits ?? character?.traits;
	const { traits } = character;
	const characterImage = `../assets/character/ch${character.id}/${character.stressMeter === 100 && !traitsSource.buffs?.includes("buff_nostoptalking") ? "anger" : "default"}_${character.gender ? "male" : "female"}.png`;
	return (
		<div className=' border-4  lg:mt-3 wood bg-[rgba(17,17,17,0.5)] lg:w-[90%] lg:p-3  relative '>
			<div className='flex items-center p-2'>
				<ChatCloseButton onClose={onClose} />
				<img src={characterImage} className='lg:hidden w-[50px] md:w-20 rounded-full' />
				<div className='flex flex-col'>
					<h2 className='text-xl md:text-3xl font-bold px-3 lg:px-10 text-center lg:text-left italic'>{t("chat.chatWith", { name: t(`names.${character.name}`) })}</h2>
					<p className='w-full text-[10px] md:text-[14px] lg:hidden text-yellow-500 italic px-3 font-bold  py-1'>{t(`characters.ch${character.id}.behaviour`)}</p>
				</div>
			</div>
			<div className='lg:hidden'>
				<StressMeter meter={character.stressMeter} />
			</div>

			<div className='flex lg:hidden p-1 md:p-3 bg-[rgba(0,0,0,0.4)] items-center justify-between'>
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
		</div>
	);
}
