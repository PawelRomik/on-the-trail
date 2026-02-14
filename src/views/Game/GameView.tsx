import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";

import { useViewContext } from "../../utils/context/view-context/useViewContext";
import CharactersView from "./CharactersView";
import ChatView from "./ChatView";

import SettingsView from "./SettingsView";
import { useStoryContext } from "../../utils/context/story-context/useStoryContext";
import { useEffect } from "react";
import LoadingScreen from "../../components/ui/LoadingScreen";
import BookView from "./BookView";

export default function GameView() {
	const { selectedCharacter, characters } = useCharactersContext();
	const { activeView } = useViewContext();
	const { location, intro, charactersStory, initStory } = useStoryContext();

	useEffect(() => {
		if (characters.length > 1 && charactersStory.length < 1) {
			initStory(characters);
		}
	}, [characters, initStory, charactersStory]);

	const bgImage = `/assets/background/${location || "manor"}.jpg`;

	if (!intro || !location || !charactersStory || !characters) return <LoadingScreen />;

	return (
		<div className='w-screen h-screen bg-cover bg-center items-center flex overflow-hidden' style={{ backgroundImage: `url(${bgImage})` }}>
			{activeView === "book" ? <BookView /> : activeView === "settings" ? <SettingsView /> : activeView === "character" && selectedCharacter ? <ChatView /> : <CharactersView />}
		</div>
	);
}
