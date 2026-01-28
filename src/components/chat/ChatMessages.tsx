import { useEffect, useRef } from "react";
import { type MessageType } from "../../types/MessageType";
import ChatMessageBubble from "./ChatMessageBubble";
import TypingIndicator from "./TypingIndicator";

type ChatMessagesProps = {
	chats: MessageType[];
	isTyping: boolean;
};

export default function ChatMessages({ chats, isTyping }: ChatMessagesProps) {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "smooth"
		});
	}, [chats, isTyping]);

	return (
		<div className='flex-1 overflow-y-auto wood bg-[rgba(0,0,0,0.6)] border-x-4 w-[90%] space-y-3 p-6'>
			{chats.map((msg, idx) => (
				<ChatMessageBubble key={idx} msg={msg} />
			))}

			{isTyping && <TypingIndicator />}

			<div ref={bottomRef} />
		</div>
	);
}
