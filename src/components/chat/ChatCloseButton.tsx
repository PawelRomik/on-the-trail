export default function ChatCloseButton({ onClose }: { onClose: () => void }) {
	return (
		<button onClick={onClose} className='cursor-pointer absolute top-4 right-4 text-2xl text-red-800 hover:text-red-600 transition font-bold' title='Zamknij czat'>
			<i className='ri-close-circle-line'></i>
		</button>
	);
}
