import { type CharacterType } from "../../types/CharacterType";
import { type MessageType } from "../../types/MessageType";
import Character from "../../components/character/Character";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";

type ChatViewProps = {
	character: CharacterType;
	chats: MessageType[];
	inputText: string;
	setInputText: (text: string) => void;
	onSend: () => void;
	onClose: () => void;
};

export default function ChatView({ character, chats, inputText, setInputText, onSend, onClose }: ChatViewProps) {
	return (
		<div className='flex w-full h-full'>
			<div className='relative flex-2 bg-[rgba(0,0,0,0.6)] p-6 text-white flex flex-col'>
				<ChatHeader character={character} onClose={onClose} />
				<ChatMessages chats={chats} character={character} />
				<ChatInput stress={character.stressMeter} inputText={inputText} setInputText={setInputText} onSend={onSend} />
			</div>

			<div className='flex justify-end items-end flex-1'>
				<Character character={character} />
			</div>
		</div>
	);
}
