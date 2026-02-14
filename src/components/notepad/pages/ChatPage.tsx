import React from "react";
import { useChatContext } from "../../../utils/context/chat-context/useChatContext";
import { useCharactersContext } from "../../../utils/context/character-context/useCharacterContext";
import Message from "../Message";

type ChatPageProps = {
	id: number;
};

const ChatPage = React.forwardRef<HTMLDivElement, ChatPageProps>((props, ref) => {
	const { history } = useChatContext();
	const { characters } = useCharactersContext();
	return (
		<div ref={ref} className='paper-bg h-full w-full p-2 overflow-y-auto flex flex-col gap-2 brightness-110'>
			{history
				.filter((entry) => entry.character.title === characters[props.id].title)
				.map((entry, index) => (
					<Message key={index} entry={entry} />
				))}
		</div>
	);
});

export default ChatPage;
