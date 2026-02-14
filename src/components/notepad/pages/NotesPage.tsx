import React from "react";
import { useNotepad } from "../../../utils/context/notes-context/useNotepadContext";
import NotesArea from "../NotesArea";

const NotesPage = React.forwardRef<HTMLDivElement>((_, ref) => {
	const { notes, setNotes } = useNotepad();
	return (
		<div ref={ref} className='paper-bg h-full bg-cover w-full p-2 overflow-y-auto flex flex-col gap-2 brightness-110'>
			<NotesArea notes={notes} setNotes={setNotes} />
		</div>
	);
});

export default NotesPage;
