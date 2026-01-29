import ChatCharacterImage from "./ChatCharacterImage";
import type { CharacterType } from "../../../types/CharacterType";
import { useState } from "react";
import CharacterTooltip from "../../character/character-tooltip/CharacterTooltip";

type ChatCharacterProps = {
	character: CharacterType;
	onClick?: (c: CharacterType) => void;
};

export default function ChatCharacter({ character, onClick }: ChatCharacterProps) {
	const [hovered, setHovered] = useState(false);
	return (
		<div className='flex-1 flex h-full  w-[300px] pt-5  flex-col items-center justify-end '>
			<ChatCharacterImage setHovered={setHovered} character={character} onClick={onClick} />
			{hovered && <CharacterTooltip character={character} />}
		</div>
	);
}
