import library from "../../assets/background/library.jpg";
import MusicPlayer from "../../components/music-player/MusicPlayer";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import CharactersView from "./CharactersView";
import ChatView from "./ChatView";
import NotepadView from "./NotepadView";
import SettingsView from "./SettingsView";
import menuMusic from "../../../public/assets/sound/music/game.mp3";

export default function GameView() {
	const { selectedCharacter } = useCharactersContext();
	const { activeView } = useViewContext();
	const { musicVolume } = useSettings();

	return (
		<div className='w-screen h-screen bg-cover bg-center items-center flex overflow-hidden' style={{ backgroundImage: `url(${library})` }}>
			<MusicPlayer src={menuMusic} volume={musicVolume} loop={true} muted={true} unmuteOnClick={true} />
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
