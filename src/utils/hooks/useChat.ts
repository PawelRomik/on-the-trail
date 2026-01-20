import { useEffect, useRef, useState } from "react";
import type { CharacterType } from "../../types/CharacterType";
import type { MessageType } from "../../types/MessageType";
import { useCharactersContext } from "../context/character-context/useCharacterContext";
import { useTranslation } from "react-i18next";
import { playCharacterSound } from "../misc/playCharacterSound";
import { useSettings } from "../context/settings-context/useSettings";
import { useStoryContext } from "../context/story-context/useStoryContext";

export type HistoryEntry = {
	character: CharacterType;
	message: MessageType;
};

export function useChat() {
	const { characters, setCharacters } = useCharactersContext();
	const { t } = useTranslation();
	const [chats, setChats] = useState<Record<number, MessageType[]>>({});
	const { voiceVolume } = useSettings();
	const { charactersStory, intro, location } = useStoryContext();

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!characters || characters.length === 0) return;
		if (initializedRef.current) return;

		const start: Record<number, MessageType[]> = {};

		characters.forEach((c) => {
			start[c.id] = [{ from: "character", text: t("chat.startingMessage") }];
		});

		setChats(start);

		initializedRef.current = true;
	}, [characters, t]);

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
					character: {
						name: t(`names.${character.name}`),
						age: character.age,
						title: t(`characters.ch${character.id}.title`),
						traits: character.traits,
						StressMeter: character.stressMeter
					},
					messages: [...(chats[character.id] || []), playerMsg],
					story: charactersStory,
					intro: intro,
					location: location
				})
			});

			const data = await res.json();
			const replyText = data.message || "…";
			const stressChange = typeof data.stress === "number" ? data.stress : 0;

			playCharacterSound({ characters: characters, characterId: character.id, sound: data.sound, volume: voiceVolume });

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
		if (!characters) return;

		const resetChats: Record<number, MessageType[]> = {};

		characters.forEach((c) => {
			resetChats[c.id] = [{ from: "character", text: t("chat.startingMessage") }];
		});

		setChats(resetChats);
		setHistory([]);
	};

	return { chats, history, sendMessage, resetChats };
}
