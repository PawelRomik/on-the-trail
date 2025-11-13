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
		<div className='mb-4'>
			<ChatCloseButton onClose={onClose} />
			<h2 className='text-3xl font-bold'>{t("chat.chatWith", { name: t(`names.${character.name}`) })}</h2>
		</div>
	);
}
