export default function ChatCloseButton({ onClose }: { onClose: () => void }) {
	return (
		<button onClick={onClose} className='cursor-pointer absolute top-4 right-4 text-2xl text-white hover:text-red-400 font-bold' title='Zamknij czat'>
			✕
		</button>
	);
}
