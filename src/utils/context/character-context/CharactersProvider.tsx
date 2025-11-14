import { createContext } from "react";
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
	const { characters, setCharacters, selectedCharacter, setSelectedCharacter } = useCharacters();

	return <CharactersContext.Provider value={{ characters, setCharacters, selectedCharacter, setSelectedCharacter }}>{children}</CharactersContext.Provider>;
}

export { CharactersContext };
