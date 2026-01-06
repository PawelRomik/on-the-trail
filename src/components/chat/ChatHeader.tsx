import { useTranslation } from "react-i18next";
import { type CharacterType } from "../../types/CharacterType";
import ChatCloseButton from "./ChatCloseButton";

type ChatHeaderProps = {
	character: CharacterType;
	onClose: () => void;
};

export default function ChatHeader({ character, onClose }: ChatHeaderProps) {
	const { t } = useTranslation();
	return (
		<div className=' border-4  mt-3 wood bg-[rgba(17,17,17,0.5)] w-[90%] p-3 relative '>
			<ChatCloseButton onClose={onClose} />
			<h2 className='text-3xl font-bold px-10 italic'>{t("chat.chatWith", { name: t(`names.${character.name}`) })}</h2>
		</div>
	);
}
