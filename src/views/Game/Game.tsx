import library from "../../assets/background/library.jpg";
import CharactersView from "./CharactersView";
import ChatView from "./ChatView";
import { useChat } from "../../hooks/useChat";
import { useCharacters } from "../../hooks/useCharacters";

export default function Game() {
	const { characters } = useCharacters();
	const { chats, inputText, setInputText, selectedCharacter, setSelectedCharacter, handleSendMessage } = useChat(characters);

	return (
		<div className='w-screen h-screen bg-cover bg-center items-center flex overflow-hidden' style={{ backgroundImage: `url(${library})` }}>
			{selectedCharacter ? (
				<ChatView
					character={selectedCharacter}
					chats={chats[selectedCharacter.id] || []}
					inputText={inputText}
					setInputText={setInputText}
					onSend={handleSendMessage}
					onClose={() => setSelectedCharacter(null)}
				/>
			) : (
				<CharactersView characters={characters} onSelect={setSelectedCharacter} />
			)}
		</div>
	);
}
