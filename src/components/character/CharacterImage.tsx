import { useTranslation } from "react-i18next";
import type { CharacterType } from "../../types/CharacterType";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import KnifeBackground from "./knife-overlay/KnifeBackground";
import KnifeOverlay from "./knife-overlay/KnifeOverlay";

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
		<div className='relative h-full w-full flex group'>
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
