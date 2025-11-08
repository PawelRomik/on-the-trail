import library from "../../assets/background/library.jpg";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import CharactersView from "./CharactersView";
import ChatView from "./ChatView";

import NotepadView from "./NotepadView";

export default function Game() {
	const { selectedCharacter } = useCharactersContext();
	const { activeView } = useViewContext();

	return (
		<div className='w-screen h-screen bg-cover bg-center items-center flex overflow-hidden' style={{ backgroundImage: `url(${library})` }}>
			{activeView === "notepad" ? (
				<NotepadView />
			) : activeView === "settings" ? (
				<div className='text-white text-3xl'>Settings view (coming soon)</div>
			) : activeView === "character" && selectedCharacter ? (
				<ChatView />
			) : (
				<CharactersView />
			)}
		</div>
	);
}
