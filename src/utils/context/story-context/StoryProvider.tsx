import { createContext, type ReactNode } from "react";
import { useStory, type CharacterStory, type introType } from "../../hooks/useStory";
import type { CharacterType } from "../../../types/CharacterType";

type StoryContextType = {
	location: string | null;
	intro: introType | null;
	charactersStory: CharacterStory[];
	initStory: (characters: CharacterType[]) => Promise<void>;
	resetStory: () => void;
};

const StoryContext = createContext<StoryContextType | null>(null);

export function StoryProvider({ children }: { children: ReactNode }) {
	const { location, intro, charactersStory, initStory, resetStory } = useStory();

	return <StoryContext.Provider value={{ location, intro, charactersStory, initStory, resetStory }}>{children}</StoryContext.Provider>;
}

export { StoryContext };
