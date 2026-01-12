import { type MessageType } from "../../types/MessageType";
import ChatMessageBubble from "./ChatMessageBubble";

type ChatMessagesProps = {
	chats: MessageType[];
};

export default function ChatMessages({ chats }: ChatMessagesProps) {
	return (
		<div className='flex-1 overflow-y-auto wood  bg-[rgba(0,0,0,0.6)] border-x-4 w-[90%] space-y-3 p-6'>
			{chats.map((msg, idx) => (
				<ChatMessageBubble key={idx} msg={msg} />
			))}
		</div>
	);
}
