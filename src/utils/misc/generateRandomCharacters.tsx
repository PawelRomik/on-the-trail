import type { CharacterType } from "../../types/CharacterType";
import getRandomCharacters from "./getRandomCharacters";
import charactersData from "../../data/characters.json";
import getRandomInt from "./getRandomInt";
import getRandomName from "./getRandomName";

export default function generateRandomCharacters(): CharacterType[] {
	const randomFour = getRandomCharacters(charactersData, 4);
	const hasPoliceman = randomFour.some((c) => c.title.toLowerCase().includes("policjant"));

	return randomFour.map((c) => ({
		...c,
		age: getRandomInt(c.age[0], c.age[1]),
		name: getRandomName(c.gender),
		stressMeter: hasPoliceman && !c.title.toLowerCase().includes("policjant") ? 15 : 70
	}));
}
