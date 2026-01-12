import { type MessageType } from "../../types/MessageType";

type ChatMessageBubbleProps = {
	msg: MessageType;
};

export default function ChatMessageBubble({ msg }: ChatMessageBubbleProps) {
	const isPlayer = msg.from === "player";

	return (
		<div className={`flex ${isPlayer ? "justify-start" : "justify-end"}`}>
			<div
				className='max-w-[70%] p-3 rounded-2xl text-white wrap-break-word transition-all duration-300'
				style={{
					backgroundColor: isPlayer ? "rgba(0,0,0,0.8)" : "#991b1b"
				}}
			>
				{msg.text}
			</div>
		</div>
	);
}
