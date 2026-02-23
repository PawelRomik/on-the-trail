import { useTranslation } from "react-i18next";
import type { CharacterType } from "../../types/CharacterType";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import KnifeBackground from "./knife-overlay/KnifeBackground";
import KnifeOverlay from "./knife-overlay/KnifeOverlay";
import StressRing from "../ui/StressRing";

type CharacterImageProps = {
	character: CharacterType;
	setHovered: (state: boolean) => void;
	onClick?: (c: CharacterType) => void;
};

export default function CharacterImage({ character, setHovered, onClick }: CharacterImageProps) {
	const characterImage = `../assets/character/ch${character.id}/default_${character.gender ? "male" : "female"}.png`;
	const { knifeActive } = useViewContext();
	const { t } = useTranslation();

	const traitsSource = character?.actorTraits ?? character?.traits;

	const handleCharacterClick = () => {
		onClick?.(character);
	};

	return (
		<div className='relative bg-[rgba(0,0,0,0.7)] aspect-square lg:bg-[rgba(0,0,0,0)] w-40 h-40  md:w-[300px] md:h-[300px]  lg:border-none lg:rounded-none rounded-full lg:h-full lg:w-full flex overflow-hidden justify-center group'>
			<StressRing value={character.stressMeter} />
			<KnifeBackground active={knifeActive} />

			<img
				onClick={handleCharacterClick}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className={`hover:cursor-pointer ${character.stressMeter === 100 && !traitsSource.buffs?.includes("buff_nostoptalking") && "brightness-25"}`}
				src={characterImage}
				alt={t(`characters.ch${character.id}.title`)}
			/>

			<KnifeOverlay active={knifeActive} />
		</div>
	);
}
