import { type CharacterType } from "../../types/CharacterType";
import { type MessageType } from "../../types/MessageType";
import ChatMessageBubble from "./ChatMessageBubble";

type ChatMessagesProps = {
	chats: MessageType[];
	character: CharacterType;
};

export default function ChatMessages({ chats, character }: ChatMessagesProps) {
	console.log(chats, character);
	return (
		<div className='flex-1 overflow-y-auto space-y-3 mb-4 p-2'>
			{chats.map((msg, idx) => (
				<ChatMessageBubble key={idx} msg={msg} character={character} />
			))}
		</div>
	);
}
