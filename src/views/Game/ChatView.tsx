import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";
import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../utils/context/chat-context/useChatContext";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import { playCharacterSound } from "../../utils/misc/playCharacterSound";
import playSound from "../../utils/misc/playSound";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import ChatCharacter from "../../components/chat/ChatCharacter/ChatCharacter";

export default function ChatView() {
	const [inputText, setInputText] = useState("");
	const { chats, sendMessage, isTyping } = useChatContext();
	const { selectedCharacter, characters, setSelectedCharacter } = useCharactersContext();
	const { setActiveView } = useViewContext();
	const { voiceVolume } = useSettings();

	const charactersRef = useRef(characters);

	useEffect(() => {
		charactersRef.current = characters;
	}, [characters]);

	useEffect(() => {
		if (!selectedCharacter) return;

		playCharacterSound({
			characters: charactersRef.current,
			characterId: selectedCharacter.id,
			sound: "hello",
			volume: voiceVolume
		});
	}, [selectedCharacter, voiceVolume]);

	if (!selectedCharacter) return null;

	const currentChar = characters.find((c) => c.id === selectedCharacter.id);

	const handleSend = () => {
		if (!currentChar) return;
		sendMessage(currentChar, inputText);
		setInputText("");
		playSound("button_press", voiceVolume);
	};

	const closeChat = () => {
		setSelectedCharacter(null);
		setActiveView("game");
	};

	if (!currentChar) return null;

	return (
		<div className='flex w-screen h-screen overflow-hidden gap-x-20'>
			<div className='relative flex-2 h-full    text-white flex flex-col'>
				<ChatHeader character={currentChar} onClose={closeChat} />
				<ChatMessages chats={chats[currentChar.id] || []} isTyping={isTyping?.[currentChar.id]} />
				<ChatInput
					character={currentChar}
					stress={currentChar.stressMeter}
					disabled={isTyping?.[currentChar.id]}
					inputText={inputText}
					setInputText={setInputText}
					onSend={handleSend}
				/>
			</div>

			<div className='flex justify-end items-end flex-1'>
				<ChatCharacter character={currentChar} />
			</div>
		</div>
	);
}
