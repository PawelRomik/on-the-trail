import { useContext } from "react";
import { ChatContext } from "./ChatProvider";

export function useChatContext() {
	const ctx = useContext(ChatContext);
	if (!ctx) throw new Error("useCharacterChat must be used within a CharacterChatProvider");
	return ctx;
}
