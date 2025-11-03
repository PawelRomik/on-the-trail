import { useState } from "react";
import CharacterDescription from "./CharacterDescription";
import CharacterSummary from "./CharacterSummary";
import CharacterImage from "./CharacterImage";

type CharacterProps = {
	character: {
		id: number;
		name: string;
		age: number;
		stressMeter: number;
		color: string;
		gender: boolean;
		desc: string;
	};
	onClick?: () => void;
};

export default function Character({ character, onClick }: CharacterProps) {
	const [hovered, setHovered] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	return (
		<div className='flex-1 flex bg-[rgba(0,0,0,0.4)] flex-col items-center justify-center '>
			<CharacterImage character={character} setHovered={setHovered} setMousePos={setMousePos} onClick={onClick} />
			<CharacterSummary character={character} />
			{hovered && <CharacterDescription character={character} x={mousePos.x} y={mousePos.y} />}
		</div>
	);
}
