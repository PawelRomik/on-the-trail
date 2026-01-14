import { type CharacterType } from "../../types/CharacterType";
import Character from "../../components/character/Character";
import Navbar from "../../components/navbar/Navbar";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import Story from "../../components/ui/Story";
import EndScreen from "../../components/end-screen/EndScreen";
import { useState } from "react";
import playSound from "../../utils/misc/playSound";
import { useSettings } from "../../utils/context/settings-context/useSettings";

export default function CharactersView() {
	const { characters, setSelectedCharacter } = useCharactersContext();
	const { setActiveView, knifeActive } = useViewContext();
	const { voiceVolume } = useSettings();
	const [endScreen, setEndScreen] = useState<boolean>(false);

	const selectCharacter = (c: CharacterType) => {
		setSelectedCharacter(c);
		if (!knifeActive) {
			setActiveView("character");
		} else {
			playSound("slash", voiceVolume);
			setEndScreen(true);
		}
	};

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='flex-col w-full items-center justify-center h-full'>
				<Story />
				{endScreen && <EndScreen />}
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
