import { type CharacterType } from "../types/CharacterType";
import { useEffect, useState } from "react";
import charactersData from "../data/characters.json";
import namesData from "../data/names.json";

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName(gender: boolean) {
	const list = gender ? namesData.male : namesData.female;
	return list[Math.floor(Math.random() * list.length)];
}

function getRandomCharacters<T>(arr: T[], count: number): T[] {
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

export function useCharacters() {
	const [characters, setCharacters] = useState<CharacterType[]>([]);

	useEffect(() => {
		const randomFour = getRandomCharacters(charactersData, 4);

		const randomized = randomFour.map((char) => ({
			...char,
			age: getRandomInt(char.age[0], char.age[1]),
			name: getRandomName(char.gender),
			stressMeter: getRandomInt(0, 100)
		}));

		setCharacters(randomized);
	}, []);

	return { characters };
}
