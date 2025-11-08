import { createContext, useState } from "react";
import { type ReactNode } from "react";
import type { CharacterType } from "../../../types/CharacterType";
import { useCharacters } from "../../hooks/useCharacters";

export type CharactersContextType = {
	characters: CharacterType[];
	setCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>;
	selectedCharacter: CharacterType | null;
	setSelectedCharacter: (char: CharacterType | null) => void;
};

const CharactersContext = createContext<CharactersContextType | undefined>(undefined);

export function CharactersProvider({ children }: { children: ReactNode }) {
	const { characters, setCharacters } = useCharacters();
	const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);

	return <CharactersContext.Provider value={{ characters, setCharacters, selectedCharacter, setSelectedCharacter }}>{children}</CharactersContext.Provider>;
}

export { CharactersContext };
