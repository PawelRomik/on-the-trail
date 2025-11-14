import { useEffect, useState } from "react";
import type { CharacterType } from "../../types/CharacterType";
import generateRandomCharacters from "../misc/generateRandomCharacters";

export function useCharacters() {
	const [characters, setCharacters] = useState<CharacterType[]>([]);
	const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);

	useEffect(() => {
		setCharacters(generateRandomCharacters());
	}, []);

	return { characters, setCharacters, selectedCharacter, setSelectedCharacter };
}
