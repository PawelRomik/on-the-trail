import { useEffect, useState } from "react";
import type { CharacterType } from "../../types/CharacterType";
import generateRandomCharacters from "../misc/generateRandomCharacters";

export function useCharacters() {
	const [characters, setCharacters] = useState<CharacterType[]>([]);

	useEffect(() => {
		setCharacters(generateRandomCharacters());
	}, []);

	return { characters, setCharacters };
}
