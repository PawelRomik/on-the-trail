import { useState } from "react";
import CharacterTooltip from "./character-tooltip/CharacterTooltip";
import CharacterSummary from "./CharacterSummary";
import CharacterImage from "./CharacterImage";
import type { CharacterType } from "../../types/CharacterType";
import { useViewContext } from "../../utils/context/view-context/useViewContext";

type CharacterProps = {
	character: CharacterType;
	onClick?: (c: CharacterType) => void;
};

export default function Character({ character, onClick }: CharacterProps) {
	const [hovered, setHovered] = useState(false);
	const { knifeActive } = useViewContext();

	return (
		<div className={`flex-1 flex lg:h-full  lg:w-[300px] lg:bg-[rgba(0,0,0,0.4)] flex-col items-center justify-end ${knifeActive && "hover:bg-[rgba(19,1,1,0.5)]"} `}>
			<CharacterImage character={character} setHovered={setHovered} onClick={onClick} />
			<CharacterSummary character={character} />
			{hovered && !knifeActive && <CharacterTooltip character={character} />}
		</div>
	);
}
