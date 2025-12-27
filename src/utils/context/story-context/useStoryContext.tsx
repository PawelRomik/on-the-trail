import { useContext } from "react";
import { StoryContext } from "./StoryProvider";

export function useStoryContext() {
	const context = useContext(StoryContext);
	if (!context) {
		throw new Error("useStoryContext must be used within StoryProvider");
	}
	return context;
}
