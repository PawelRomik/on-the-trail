import Character from "../../components/character/Character";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";
import { useState } from "react";
import { useChatContext } from "../../utils/context/chat-context/useChatContext";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";

export default function ChatView() {
	const [inputText, setInputText] = useState("");
	const { chats, sendMessage } = useChatContext();
	const { selectedCharacter, setSelectedCharacter } = useCharactersContext();
	const { setActiveView } = useViewContext();

	const handleSend = () => {
		if (!selectedCharacter) return;
		sendMessage(selectedCharacter, inputText);
		setInputText("");
	};

	const closeChat = () => {
		setSelectedCharacter(null);
		setActiveView("game");
	};

	if (!selectedCharacter) return null;

	return (
		<div className='flex w-full h-full'>
			<div className='relative flex-2 bg-[rgba(0,0,0,0.6)] p-6 text-white flex flex-col'>
				<ChatHeader character={selectedCharacter} onClose={closeChat} />
				<ChatMessages chats={chats[selectedCharacter.id] || []} character={selectedCharacter} />
				<ChatInput stress={selectedCharacter.stressMeter} inputText={inputText} setInputText={setInputText} onSend={handleSend} />
			</div>

			<div className='flex justify-end items-end flex-1'>
				<Character character={selectedCharacter} />
			</div>
		</div>
	);
}
