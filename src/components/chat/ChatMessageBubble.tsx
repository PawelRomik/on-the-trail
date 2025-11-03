import { useEffect, useState } from "react";
import { type CharacterType } from "../../types/CharacterType";
import { type MessageType } from "../../types/MessageType";

type ChatMessageBubbleProps = {
	msg: MessageType;
	character: CharacterType;
};

export default function ChatMessageBubble({ msg, character }: ChatMessageBubbleProps) {
	const isPlayer = msg.from === "player";
	const [displayedText, setDisplayedText] = useState(isPlayer ? msg.text : "");

	useEffect(() => {
		let i = 0;
		const interval = setInterval(() => {
			setDisplayedText(msg.text.slice(0, i + 1));
			i++;
			if (i >= msg.text.length) clearInterval(interval);
		}, 20);

		return () => clearInterval(interval);
	}, [msg.text, isPlayer]);

	return (
		<div className={`flex ${isPlayer ? "justify-start" : "justify-end"}`}>
			<div
				className='max-w-[70%] p-3 rounded-2xl text-white wrap-break-word transition-all duration-300'
				style={{
					backgroundColor: isPlayer ? "rgba(59,130,246,0.8)" : character.color
				}}
			>
				{displayedText}
			</div>
		</div>
	);
}
