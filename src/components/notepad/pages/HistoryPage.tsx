import React from "react";
import Message from "../Message";
import { useChatContext } from "../../../utils/context/chat-context/useChatContext";

const HistoryPage = React.forwardRef<HTMLDivElement>((_, ref) => {
	const { history } = useChatContext();
	return (
		<div ref={ref} className='paper-bg h-full w-full p-2 overflow-y-auto flex flex-col gap-2 brightness-110'>
			{history.map((entry, index) => (
				<Message key={index} entry={entry} />
			))}
		</div>
	);
});

export default HistoryPage;
