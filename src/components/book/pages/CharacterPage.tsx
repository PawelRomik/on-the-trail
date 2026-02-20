import { useTranslation } from "react-i18next";
import { useCharactersContext } from "../../../utils/context/character-context/useCharacterContext";
import React from "react";

type CharacterPageProps = {
	id: number;
};

const CharacterPage = React.forwardRef<HTMLDivElement, CharacterPageProps>((props, ref) => {
	const { characters } = useCharactersContext();
	const character = characters.find((c) => c.title === characters[props.id].title) || characters[0];
	const { t } = useTranslation();
	return (
		<div ref={ref} className='paper-bg h-full w-full p-4 overflow-y-auto flex flex-col brightness-110'>
			<div className='flex flex-col justify-center w-full h-full text-center gap-4'>
				<div
					className={`w-[270px] shadow-lg bg-[rgba(255,255,0,0.1)] flex mx-auto items-center justify-center border-8 border-white ${props.id % 2 === 1 ? "-rotate-" + props.id * 2 : "rotate-"} `}
				>
					<img src={`../assets/character/ch${character.id}/default_${character.gender ? "male" : "female"}.png`} className='h-full w-full' />
				</div>

				<h2 className='italic text-4xl underline'>{t(`characters.ch${characters[props.id].id}.title`)}</h2>

				<div className='flex flex-col gap-1 italic'>
					<div className='w-[220px] h-5 border-2 border-black mx-auto overflow-hidden'>
						<div
							className='h-full'
							style={{
								width: `${character.stressMeter}%`,
								backgroundImage: "repeating-linear-gradient(110deg, black 0px, black 6px, transparent 3px, transparent 8px)"
							}}
						/>
					</div>
					<span className='text-xl'>
						{t("ui.stress", {
							amount: character.stressMeter
						})}
					</span>
				</div>

				<div className='flex text-xl italic flex-col gap-2'>
					<p>
						{t("notes.age")}: {t("ui.age", { age: character.age })}
					</p>
					<p>
						{t("notes.sex")}: {character.gender ? t("ui.male") : t("ui.female")}
					</p>
				</div>

				<div className='flex flex-col text-xl gap-2 italic'>
					{character.traits.behaviour.map((_, i) => (
						<p key={`behaviour-${i}`}>{t(`characters.ch${character.id}.behaviour`)}</p>
					))}

					{character.traits.buffs && character.traits.buffs.map((perkId) => <p key={`buff-${perkId}`}>+ {t(`characters.perks.buffs.${perkId}.desc`)}</p>)}

					{character.traits.nerfs && character.traits.nerfs.map((perkId) => <p key={`nerf-${perkId}`}>- {t(`characters.perks.nerfs.${perkId}.desc`)}</p>)}

					{character.traits.special && character.traits.special.map((perkId) => <p key={`special-${perkId}`}>* {t(`characters.perks.special.${perkId}.desc`)}</p>)}
				</div>
			</div>
		</div>
	);
});

export default CharacterPage;
