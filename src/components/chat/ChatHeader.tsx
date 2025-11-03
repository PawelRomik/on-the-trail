import { type CharacterType } from "../../types/CharacterType";
import ChatCloseButton from "./ChatCloseButton";

type ChatHeaderProps = {
	character: CharacterType;
	onClose: () => void;
};

export default function ChatHeader({ character, onClose }: ChatHeaderProps) {
	return (
		<div className='mb-4'>
			<ChatCloseButton onClose={onClose} />
			<h2 className='text-3xl font-bold'>Czat z {character.name}</h2>
		</div>
	);
}
