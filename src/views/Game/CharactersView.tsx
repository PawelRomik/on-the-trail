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
	const { setActiveView, knifeActive, setMusicMode } = useViewContext();
	const { voiceVolume } = useSettings();
	const [endScreen, setEndScreen] = useState<boolean>(false);

	const selectCharacter = (c: CharacterType) => {
		setSelectedCharacter(c);
		if (!knifeActive) {
			setActiveView("character");
		} else {
			playSound("slash", voiceVolume);
			setMusicMode("gameover");
			setEndScreen(true);
		}
	};

	return (
		<div className='w-full h-full flex flex-col lg:flex-row'>
			<div className='flex-1 min-h-0 flex flex-col'>
				<Story />

				{endScreen && <EndScreen />}

				<div className='flex-1 min-h-0 w-full flex items-center justify-center'>
					<div className='w-[80%] h-[80%] grid grid-cols-2 lg:grid-cols-4 md:gap-2 gap-20 items-center justify-items-center'>
						{characters.map((char) => (
							<Character key={char.id} character={char} onClick={(c: CharacterType) => selectCharacter(c)} />
						))}
					</div>
				</div>
			</div>

			<div className='w-full lg:w-auto shrink-0'>
				<Navbar />
			</div>
		</div>
	);
}
