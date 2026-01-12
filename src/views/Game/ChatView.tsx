import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";
import { useEffect, useState } from "react";
import { useChatContext } from "../../utils/context/chat-context/useChatContext";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import { playCharacterSound } from "../../utils/misc/playCharacterSound";
import playSound from "../../utils/misc/playSound";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import ChatCharacter from "../../components/chat/ChatCharacter/ChatCharacter";

export default function ChatView() {
	const [inputText, setInputText] = useState("");
	const { chats, sendMessage } = useChatContext();
	const { selectedCharacter, setSelectedCharacter } = useCharactersContext();
	const { setActiveView } = useViewContext();
	const { voiceVolume } = useSettings();

	useEffect(() => {
		if (selectedCharacter) playCharacterSound({ character: selectedCharacter, sound: "hello", volume: voiceVolume });
	}, [selectedCharacter, voiceVolume]);

	const handleSend = () => {
		if (!selectedCharacter) return;
		sendMessage(selectedCharacter, inputText);
		setInputText("");
		playSound("button_press", voiceVolume);
	};

	const closeChat = () => {
		setSelectedCharacter(null);
		setActiveView("game");
	};

	if (!selectedCharacter) return null;

	return (
		<div className='flex w-screen h-screen overflow-hidden gap-20'>
			<div className='relative flex-2    text-white flex flex-col'>
				<ChatHeader character={selectedCharacter} onClose={closeChat} />
				<ChatMessages chats={chats[selectedCharacter.id] || []} />
				<ChatInput stress={selectedCharacter.stressMeter} inputText={inputText} setInputText={setInputText} onSend={handleSend} />
			</div>

			<div className='flex justify-end items-end flex-1'>
				<ChatCharacter character={selectedCharacter} />
			</div>
		</div>
	);
}
