import type { CharacterType } from "../../types/CharacterType";

type PlaySoundParams = {
	characters: CharacterType[];
	sound: string;
	characterId: number;
	volume?: number;
};

export function playCharacterSound({ characters, characterId, sound, volume = 50 }: PlaySoundParams) {
	if (typeof sound !== "string" || sound.trim() === "") return;

	const index = characters.findIndex((c) => c.id === characterId);
	if (index === -1) return;
	const character = characters[index];

	try {
		const emotion = sound.trim();
		const sex = character.gender ? "male" : "female";

		const voiceId = index + 1;

		const soundFile = `${emotion}_${sex}_${voiceId}.mp3`;

		const audio = new Audio(`/assets/sound/character/${soundFile}`);
		audio.volume = Math.max(0, Math.min(1, volume / 100));
		audio.play();
	} catch (e) {
		console.error("Audio play error:", e);
	}
}
