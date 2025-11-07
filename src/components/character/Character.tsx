import { useState } from "react";
import CharacterTooltip from "./character-tooltip/CharacterTooltip";
import CharacterSummary from "./CharacterSummary";
import CharacterImage from "./CharacterImage";
import type { CharacterType } from "../../types/CharacterType";

type CharacterProps = {
	character: CharacterType;
	onClick?: () => void;
};

export default function Character({ character, onClick }: CharacterProps) {
	const [hovered, setHovered] = useState(false);

	return (
		<div className='flex-1 flex h-full  w-[300px] bg-[rgba(0,0,0,0.4)] flex-col items-center justify-end '>
			<CharacterImage character={character} setHovered={setHovered} onClick={onClick} />
			<CharacterSummary character={character} />
			{hovered && <CharacterTooltip character={character} />}
		</div>
	);
}
