import { useContext } from "react";
import { CharactersContext } from "./CharactersProvider";

export function useCharactersContext() {
	const ctx = useContext(CharactersContext);
	if (!ctx) throw new Error("useCharacters must be used within a CharactersProvider");
	return ctx;
}
