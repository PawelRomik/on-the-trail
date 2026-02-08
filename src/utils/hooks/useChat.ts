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
	const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});

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
		if (!character) return;
		if (isTyping?.[character.id]) return;
		if (!text.trim()) return;

		const playerMsg: MessageType = { from: "player", text };

		setChats((prev) => ({
			...prev,
			[character.id]: [...(prev[character.id] || []), playerMsg]
		}));

		setHistory((prev) => [...prev, { character, message: playerMsg }]);

		setIsTyping((prev) => ({ ...prev, [character.id]: true }));

		try {
			const traitsSource = character.actorTraits ?? character.traits;
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					characters: characters.map((c) => ({
						name: t(`names.${c.name}`),
						culprit: c.traitor === true,
						stressMeter: c.stressMeter,
						story: c.story
					})),
					character: {
						name: t(`names.${character.name}`),
						age: character.age,
						title: t(`characters.ch${character.id}.title`),
						nerf: traitsSource?.nerfs?.[0]
							? {
									name: traitsSource.nerfs[0],
									desc: t(`characters.perks.nerfs.${traitsSource.nerfs[0]}.desc`)
								}
							: null,

						buff: traitsSource?.buffs?.[0]
							? {
									name: traitsSource.buffs[0],
									desc: t(`characters.perks.buffs.${traitsSource.buffs[0]}.desc`)
								}
							: null,

						special: traitsSource?.special?.[0]
							? {
									name: traitsSource.special[0],
									desc: t(`characters.perks.special.${traitsSource.special[0]}.desc`)
								}
							: null,

						behaviour: character.traits.behaviour,
						stressMeter: character.stressMeter,
						traitor: character.traitor,
						jesterTruth: character.jesterTruth
					},
					messages: [...(chats[character.id] || []), playerMsg],
					story: charactersStory,
					intro: intro,
					location: location
				})
			});

			const data = await res.json();
			const isInfernalBargainTriggered = data.bargain === true;
			if (isInfernalBargainTriggered) {
				setCharacters((prev) =>
					prev.map((c) => ({
						...c,
						stressMeter: Math.min(100, c.stressMeter + 20),
						infernalBargainUsed: c.id === character.id ? true : c.infernalBargainUsed
					}))
				);
			}
			const replyText = data.message || "…";
			const stressChange = typeof data.stress === "number" ? data.stress : 0;

			const charMsg: MessageType = { from: "character", text: replyText };
			setIsTyping((prev) => ({ ...prev, [character.id]: false }));

			setChats((prev) => ({
				...prev,
				[character.id]: [...(prev[character.id] || []), charMsg]
			}));

			setHistory((prev) => [...prev, { character, message: charMsg }]);

			setCharacters((prevChars) =>
				prevChars.map((c) => {
					if (c.id !== character.id) return c;

					const traitsSource = c.actorTraits ?? c.traits;

					let multiplier = 1;

					if (traitsSource?.buffs?.includes("buff_slowstress")) {
						multiplier *= 0.75;
					}

					if (traitsSource?.nerfs?.includes("nerf_faststress")) {
						multiplier *= 1.2;
					}

					const hasSlowStressCharsBuff = prevChars.some((p) => p.id !== c.id && (p.actorTraits ?? p.traits)?.buffs?.includes("buff_slowstresschars"));

					if (hasSlowStressCharsBuff) {
						multiplier *= 0.8;
					}

					if (traitsSource?.special?.includes("special_bravevoice")) {
						const lowestStress = Math.min(...prevChars.map((p) => p.stressMeter));

						if (c.stressMeter === lowestStress) {
							multiplier *= 1.2;
						}
					}

					const stressDelta = Math.round(stressChange * multiplier);
					const newStress = Math.min(100, c.stressMeter + stressDelta);

					let finalSound = data.sound;
					if (newStress >= 100 && !traitsSource?.buffs?.includes("buff_nostoptalking")) {
						finalSound = "stop";
					}

					playCharacterSound({
						characters: prevChars,
						characterId: c.id,
						sound: finalSound,
						volume: voiceVolume
					});

					return {
						...c,
						stressMeter: newStress,
						...(c.jesterTruth && {
							jesterTruth: c.jesterTruth === "truth" ? "lie" : "truth"
						})
					};
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

	return { chats, history, sendMessage, resetChats, isTyping };
}
