import { type CharacterType } from "../types/CharacterType";
import { type MessageType } from "../types/MessageType";
import { useEffect, useState } from "react";

export function useChat(characters: CharacterType[]) {
	const [chats, setChats] = useState<Record<number, MessageType[]>>({});
	const [inputText, setInputText] = useState("");
	const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);

	useEffect(() => {
		if (characters.length === 0) return;
		const initialChats: Record<number, MessageType[]> = {};
		characters.forEach((char) => {
			initialChats[char.id] = [{ from: "character", text: "Hej, co słychać?" }];
		});
		setChats(initialChats);
	}, [characters]);

	const handleSendMessage = () => {
		if (!selectedCharacter || inputText.trim() === "") return;
		setChats((prev) => {
			const updated = { ...prev };
			updated[selectedCharacter.id] = [...(updated[selectedCharacter.id] || []), { from: "player", text: inputText }];
			return updated;
		});
		setInputText("");
	};

	return {
		chats,
		inputText,
		setInputText,
		selectedCharacter,
		setSelectedCharacter,
		handleSendMessage
	};
}
