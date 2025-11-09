export default function NotesArea({ notes, setNotes }: { notes: string; setNotes: (val: string) => void }) {
	return (
		<textarea
			className='w-full h-full overflow-y-auto p-4 rounded-md resize-none shadow-inner placeholder-gray-500
			caret-black font-mono leading-[1.6] whitespace-pre-line
			bg-[repeating-linear-gradient(to bottom,rgba(0,0,0,0.05) 0,rgba(0,0,0,0.05) 1px,transparent 1px,transparent 24px)]'
			value={notes}
			onChange={(e) => setNotes(e.target.value)}
			placeholder='Tutaj możesz robić notatki...'
		/>
	);
}
