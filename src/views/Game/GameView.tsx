import library from "../../assets/background/library.jpg";
import church from "../../assets/background/church.jpg";
import graveyard from "../../assets/background/graveyard.jpg";
import hospital from "../../assets/background/hospital.jpg";
import manor from "../../assets/background/manor.jpg";
import museum from "../../assets/background/museum.jpg";
import police from "../../assets/background/police.jpg";
import train from "../../assets/background/train.jpg";
import MusicPlayer from "../../components/music-player/MusicPlayer";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import CharactersView from "./CharactersView";
import ChatView from "./ChatView";
import NotepadView from "./NotepadView";
import SettingsView from "./SettingsView";
import gameMusic from "../../assets/music/game.mp3";
import { useStoryContext } from "../../utils/context/story-context/useStoryContext";
import { useEffect } from "react";
import LoadingScreen from "../../components/ui/LoadingScreen";

const backgrounds: Record<string, string> = {
	library,
	church,
	graveyard,
	hospital,
	manor,
	museum,
	police,
	train
};

export default function GameView() {
	const { selectedCharacter, characters } = useCharactersContext();
	const { activeView } = useViewContext();
	const { musicVolume } = useSettings();
	const { location, intro, charactersStory, initStory } = useStoryContext();

	useEffect(() => {
		if (characters.length > 1) {
			initStory(characters);
		}
	}, [characters, initStory]);

	if (!intro || !location || !charactersStory || !characters) return <LoadingScreen />;

	const bgImage = backgrounds[location] ?? "";

	return (
		<div className='w-screen h-screen bg-cover bg-center items-center flex overflow-hidden' style={{ backgroundImage: `url(${bgImage})` }}>
			<MusicPlayer src={gameMusic} volume={musicVolume} loop={true} muted={true} unmuteOnClick={true} />
			{activeView === "notepad" ? (
				<NotepadView />
			) : activeView === "settings" ? (
				<SettingsView />
			) : activeView === "character" && selectedCharacter ? (
				<ChatView />
			) : (
				<CharactersView />
			)}
		</div>
	);
}
