import library from "../../assets/background/library.jpg";
import CharactersView from "./CharactersView";
import ChatView from "./ChatView";
import { useCharacters } from "../../hooks/useCharacters";
import { useState } from "react";
import { useCharacterChat } from "../../hooks/useCharacterChat";

export default function Game() {
	const { characters, setCharacters } = useCharacters();
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const { chats, sendMessage } = useCharacterChat(characters, setCharacters);
	const [inputText, setInputText] = useState("");

	const selectedCharacter = selectedId ? characters.find((c) => c.id === selectedId) || null : null;

	const handleSend = () => {
		if (!selectedCharacter) return;
		sendMessage(selectedCharacter, inputText);
		setInputText("");
	};

	return (
		<div className='w-screen h-screen bg-cover bg-center items-center flex overflow-hidden' style={{ backgroundImage: `url(${library})` }}>
			{selectedCharacter ? (
				<ChatView
					character={selectedCharacter}
					chats={chats[selectedCharacter.id] || []}
					inputText={inputText}
					setInputText={setInputText}
					onSend={handleSend}
					onClose={() => setSelectedId(null)}
				/>
			) : (
				<CharactersView characters={characters} onSelect={(c) => setSelectedId(c.id)} />
			)}
		</div>
	);
}
