import { createContext } from "react";
import { type ReactNode } from "react";
import { useCharacters } from "../../hooks/useCharacters";
import { useChat } from "../../hooks/useChat";

const ChatContext = createContext<ReturnType<typeof useChat> | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
	const { characters, setCharacters } = useCharacters();
	const { chats, sendMessage, resetChats, history } = useChat(characters, setCharacters);

	return <ChatContext.Provider value={{ chats, sendMessage, resetChats, history }}>{children}</ChatContext.Provider>;
}

export { ChatContext };
