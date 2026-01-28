import { createContext } from "react";
import { type ReactNode } from "react";
import { useChat } from "../../hooks/useChat";

const ChatContext = createContext<ReturnType<typeof useChat> | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
	const { chats, sendMessage, resetChats, isTyping, history } = useChat();

	return <ChatContext.Provider value={{ chats, sendMessage, isTyping, resetChats, history }}>{children}</ChatContext.Provider>;
}

export { ChatContext };
