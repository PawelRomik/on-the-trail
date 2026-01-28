type ChatInputProps = {
	inputText: string;
	setInputText: (text: string) => void;
	onSend: () => void;
	stress?: number;
	disabled?: boolean;
};

export default function ChatInput({ inputText, setInputText, onSend, stress, disabled }: ChatInputProps) {
	const isDisabled = stress === 100 || disabled;

	return (
		<div className='flex gap-2 border-t-4 wood bg-[rgba(0,0,0,0.6)] border-x-4 p-3 pt-4'>
			<input
				disabled={isDisabled}
				type='text'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				placeholder={isDisabled ? "..." : "Napisz wiadomość"}
				className='flex-1 disabled:opacity-30 p-3 bg-zinc-950 rounded-xl outline-none text-white'
				onKeyDown={(e) => e.key === "Enter" && !isDisabled && onSend()}
			/>

			<button
				disabled={isDisabled}
				onClick={onSend}
				className='px-4 py-2 bg-red-800 hover:bg-red-700 disabled:opacity-30 disabled:hover:bg-red-800 transition text-xl rounded-xl font-bold'
			>
				<i className='ri-send-plane-fill'></i>
			</button>
		</div>
	);
}
