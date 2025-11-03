import type { CharacterType } from "../../types/CharacterType";

type CharacterImageProps = {
	character: CharacterType;
	setHovered: (state: boolean) => void;
	setMousePos: (pos: { x: number; y: number }) => void;
	onClick?: () => void;
};

export default function CharacterImage({ character, setHovered, setMousePos, onClick }: CharacterImageProps) {
	const characterImage = `../assets/character/ch${character.id}.png`;
	return (
		<img
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
			className='hover:cursor-pointer'
			src={characterImage}
			alt={character.name}
		/>
	);
}
