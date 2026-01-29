import MenuView from "./views/Menu/MenuView";
import GameView from "./views/Game/GameView";
import { useSettings } from "./utils/context/settings-context/useSettings";
import MusicPlayer from "./components/music-player/MusicPlayer";
import generateRandomCharacters from "./utils/misc/generateRandomCharacters";
import { useCharactersContext } from "./utils/context/character-context/useCharacterContext";
import { useChatContext } from "./utils/context/chat-context/useChatContext";
import { useStoryContext } from "./utils/context/story-context/useStoryContext";
import { useViewContext } from "./utils/context/view-context/useViewContext";

export default function App() {
	const { gameStarted, setGameStarted } = useSettings();
	const { setCharacters, setSelectedCharacter } = useCharactersContext();
	const { resetChats } = useChatContext();
	const { resetStory } = useStoryContext();
	const { setActiveView, setKnifeActive } = useViewContext();

	const onStart = () => {
		const characters = generateRandomCharacters();
		setCharacters(characters);
		setSelectedCharacter(null);
		resetChats(characters);
		setActiveView("game");
		resetStory();
		setKnifeActive(false);
		setGameStarted(true);
	};

	return (
		<>
			{gameStarted ? <GameView /> : <MenuView onStart={onStart} />}
			<MusicPlayer loop={true} muted={true} unmuteOnClick={true} />
		</>
	);
}
