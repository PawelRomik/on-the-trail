import { type CharacterType } from "../../types/CharacterType";
import Character from "../../components/character/Character";

type CharactersViewProps = {
	characters: CharacterType[];
	onSelect: (char: CharacterType) => void;
};

export default function CharactersView({ characters, onSelect }: CharactersViewProps) {
	return (
		<div className='w-full h-[800px] flex gap-4 items-center justify-center'>
			{characters.map((char) => (
				<Character key={char.id} character={char} onClick={() => onSelect(char)} />
			))}
		</div>
	);
}
