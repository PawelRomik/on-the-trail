import { type CharacterType } from "../../types/CharacterType";
import Character from "../../components/character/Character";
import Navbar from "../../components/navbar/Navbar";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import Story from "../../components/ui/Story";

export default function CharactersView() {
	const { characters, setSelectedCharacter } = useCharactersContext();
	const { setActiveView } = useViewContext();

	const selectCharacter = (c: CharacterType) => {
		setSelectedCharacter(c);
		setActiveView("character");
	};

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='flex-col w-full items-center justify-center h-full'>
				<Story />
				<div className='w-[80%] m-auto h-[800px] flex gap-4 items-center justify-center'>
					{characters.map((char) => (
						<Character key={char.id} character={char} onClick={(c: CharacterType) => selectCharacter(c)} />
					))}
				</div>
			</div>
			<Navbar />
		</div>
	);
}
