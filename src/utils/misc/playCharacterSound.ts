import type { CharacterType } from "../../types/CharacterType";

type PlaySoundParams = {
	character: CharacterType;
	sound: string;
	volume?: number;
};

export function playCharacterSound({ character, sound, volume = 50 }: PlaySoundParams) {
	if (typeof sound !== "string" || sound.trim() === "") return;

	try {
		const emotion = sound.trim();
		const sex = character.gender ? "male" : "female";
		const idmod = (character.id % 2) + 1;

		const soundFile = `${emotion}_${sex}_${idmod}.mp3`;

		const audio = new Audio(`/assets/sound/character/${soundFile}`);
		audio.volume = Math.max(0, Math.min(1, volume / 100));
		audio.play();
	} catch (e) {
		console.error("Audio play error:", e);
	}
}
