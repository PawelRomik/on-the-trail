type ChatInputProps = {
	inputText: string;
	setInputText: (text: string) => void;
	onSend: () => void;
};

export default function ChatInput({ inputText, setInputText, onSend }: ChatInputProps) {
	return (
		<div className='flex gap-2'>
			<input
				type='text'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				placeholder='Napisz wiadomość...'
				className='flex-1 p-3 bg-zinc-800 rounded-xl outline-none text-white'
				onKeyDown={(e) => e.key === "Enter" && onSend()}
			/>
			<button onClick={onSend} className='px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold'>
				Wyślij
			</button>
		</div>
	);
}
