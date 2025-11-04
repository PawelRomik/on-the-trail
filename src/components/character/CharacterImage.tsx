import type { CharacterType } from "../../types/CharacterType";

type CharacterImageProps = {
	character: CharacterType;
	setHovered: (state: boolean) => void;
	onClick?: () => void;
};

export default function CharacterImage({ character, setHovered, onClick }: CharacterImageProps) {
	const characterImage = `../assets/character/ch${character.id}.png`;
	return (
		<img
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={`hover:cursor-pointer ${character.stressMeter === 100 && "brightness-25"}`}
			src={characterImage}
			alt={character.name}
		/>
	);
}
