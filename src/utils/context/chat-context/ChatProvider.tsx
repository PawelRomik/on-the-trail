import { createContext } from "react";
import { type ReactNode } from "react";
import { useChat } from "../../hooks/useChat";

const ChatContext = createContext<ReturnType<typeof useChat> | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
	const { chats, sendMessage, resetChats, history } = useChat();

	return <ChatContext.Provider value={{ chats, sendMessage, resetChats, history }}>{children}</ChatContext.Provider>;
}

export { ChatContext };
