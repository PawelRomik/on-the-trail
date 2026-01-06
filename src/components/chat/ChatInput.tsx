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
		<div className='flex gap-2 border-t-4 wood bg-[rgba(0,0,0,0.6)] border-x-4 p-3 pt-4'>
			<input
				disabled={stress === 100}
				type='text'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				placeholder={t("chat.sendMessage")}
				className='flex-1 disabled:opacity-30 p-3 bg-zinc-950 rounded-xl outline-none text-white'
				onKeyDown={(e) => e.key === "Enter" && onSend()}
			/>
			<button
				disabled={stress === 100}
				onClick={onSend}
				className='px-4 disabled:opacity-30 disabled:hover:bg-red-800 py-2 bg-red-800 hover:bg-red-700 transition cursor-pointer text-xl rounded-xl font-bold'
			>
				<i className='ri-send-plane-fill'></i>
			</button>
		</div>
	);
}
