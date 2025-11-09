import { useState } from "react";
import type { CharacterType } from "../../types/CharacterType";
import type { MessageType } from "../../types/MessageType";

export type HistoryEntry = {
	character: CharacterType;
	message: MessageType;
};

export function useChat(initialCharacters: CharacterType[], setCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>) {
	const [chats, setChats] = useState<Record<number, MessageType[]>>(() => {
		const start: Record<number, MessageType[]> = {};
		initialCharacters.forEach((c) => {
			start[c.id] = [];
		});
		return start;
	});

	const [history, setHistory] = useState<HistoryEntry[]>([]);

	const sendMessage = async (character: CharacterType, text: string) => {
		if (!text.trim()) return;

		const playerMsg: MessageType = { from: "player", text };

		setChats((prev) => ({
			...prev,
			[character.id]: [...(prev[character.id] || []), playerMsg]
		}));

		setHistory((prev) => [...prev, { character, message: playerMsg }]);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					character,
					messages: [...(chats[character.id] || []), playerMsg]
				})
			});

			const data = await res.json();
			const replyText = data.message || "…";
			const stressChange = typeof data.stress === "number" ? data.stress : 0;

			const charMsg: MessageType = { from: "character", text: replyText };

			setChats((prev) => ({
				...prev,
				[character.id]: [...(prev[character.id] || []), charMsg]
			}));

			setHistory((prev) => [...prev, { character, message: charMsg }]);

			setCharacters((prevChars) =>
				prevChars.map((c) => {
					if (c.id !== character.id) return c;

					let multiplier = 1;
					const title = c.title.toLowerCase();
					if (title.includes("babcia")) multiplier = 1.25;
					else if (title.includes("policjant") || title.includes("rycerz")) multiplier = 0.75;
					else if (title.includes("diabeł")) multiplier = Math.max(0, 1 - prevChars.filter((p) => p.stressMeter > 50 && p.id !== c.id).length * 0.1);

					const stressDelta = Math.round(stressChange * multiplier);
					const newStress = Math.min(100, c.stressMeter + stressDelta);
					return { ...c, stressMeter: newStress };
				})
			);
		} catch (err) {
			console.error(err);
		}
	};

	const resetChats = (characters: CharacterType[]) => {
		const emptyChats: Record<number, MessageType[]> = {};
		characters.forEach((c) => (emptyChats[c.id] = []));
		setChats(emptyChats);
		setHistory([]);
	};

	return { chats, history, sendMessage, resetChats };
}
