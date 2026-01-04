import { useTranslation } from "react-i18next";
import type { HistoryEntry } from "../../utils/hooks/useChat";

export default function Note({ entry }: { entry: HistoryEntry }) {
	const { character, message } = entry;
	const isPlayer = message.from === "player";
	const { t } = useTranslation();

	return (
		<div className={`flex text-xl ${isPlayer ? "justify-start" : "justify-end"}`}>
			<div className={`flex gap-3 ${isPlayer ? "items-start" : "items-end"} flex-col p-2 rounded-2xl   `}>
				<span className='border-b-2 px-3 text-center ' style={{ color: isPlayer ? "#000" : character.color }}>
					{isPlayer ? t("chat.you") : character.name}
				</span>
				<span>{message.text}</span>
			</div>
		</div>
	);
}
