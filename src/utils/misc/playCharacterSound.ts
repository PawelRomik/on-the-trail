import type { CharacterType } from "../../types/CharacterType";

type PlaySoundParams = {
	character: CharacterType;
	sound: string;
};

export function playCharacterSound({ character, sound }: PlaySoundParams) {
	if (typeof sound !== "string" || sound.trim() === "") return;

	try {
		const emotion = sound.trim();
		const sex = character.gender ? "male" : "female";
		const idmod = (character.id % 2) + 1;

		const soundFile = `${emotion}_${sex}_${idmod}.mp3`;

		const audio = new Audio(`/assets/sound/character/${soundFile}`);
		audio.play();
	} catch (e) {
		console.error("Audio play error:", e);
	}
}
