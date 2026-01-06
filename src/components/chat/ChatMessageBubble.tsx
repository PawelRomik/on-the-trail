import { type CharacterType } from "../../types/CharacterType";
import { type MessageType } from "../../types/MessageType";

type ChatMessageBubbleProps = {
	msg: MessageType;
	character: CharacterType;
};

export default function ChatMessageBubble({ msg, character }: ChatMessageBubbleProps) {
	const isPlayer = msg.from === "player";

	return (
		<div className={`flex ${isPlayer ? "justify-start" : "justify-end"}`}>
			<div
				className='max-w-[70%] p-3 rounded-2xl text-white wrap-break-word transition-all duration-300'
				style={{
					backgroundColor: isPlayer ? "#991b1b" : character.color
				}}
			>
				{msg.text}
			</div>
		</div>
	);
}
