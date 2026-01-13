import type { CharacterType } from "../../types/CharacterType";
import getRandomCharacters from "./getRandomCharacters";
import charactersData from "../../data/characters.json";
import getRandomInt from "./getRandomInt";
import getRandomName from "./getRandomName";

export default function generateRandomCharacters(): CharacterType[] {
	const randomFour = getRandomCharacters(charactersData, 4);
	const hasPoliceman = randomFour.some((c) => c.title.toLowerCase().includes("policjant"));

	const traitorIndex = getRandomInt(0, randomFour.length - 1);

	return randomFour.map((c, index) => ({
		...c,
		age: getRandomInt(c.age[0], c.age[1]),
		name: getRandomName(c.gender),
		stressMeter: hasPoliceman && !c.title.toLowerCase().includes("policjant") ? 15 : 0,
		traitor: index === traitorIndex
	}));
}
