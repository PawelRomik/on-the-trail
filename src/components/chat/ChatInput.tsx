import { useTranslation } from "react-i18next";

type ChatInputProps = {
	inputText: string;
	setInputText: (text: string) => void;
	onSend: () => void;
	stress?: number;
};

export default function ChatInput({ inputText, setInputText, onSend, stress }: ChatInputProps) {
	const { t } = useTranslation();
	return (
		<div className='flex gap-2'>
			<input
				disabled={stress === 100}
				type='text'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				placeholder={t("chat.sendMessage")}
				className='flex-1 disabled:opacity-30 p-3 bg-zinc-800 rounded-xl outline-none text-white'
				onKeyDown={(e) => e.key === "Enter" && onSend()}
			/>
			<button disabled={stress === 100} onClick={onSend} className='px-4 disabled:opacity-30 disabled:hover:bg-blue-600 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold'>
				{t("chat.send")}
			</button>
		</div>
	);
}
