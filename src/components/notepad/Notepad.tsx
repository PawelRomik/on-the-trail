import { useNotepad } from "../../utils/context/notes-context/useNotepadContext";
import type { HistoryEntry } from "../../utils/hooks/useChat";
import Note from "./Note";
import NotesArea from "./NotesArea";
import Stickers from "./Stickers";

type NotepadProps = {
	filteredHistory: HistoryEntry[];
	showNotes: boolean;
	setShowNotes: (val: boolean) => void;
	setFilterCharacter: (val: string | null | undefined) => void;
};

export default function Notepad({ filteredHistory, showNotes, setShowNotes, setFilterCharacter }: NotepadProps) {
	const { notes, setNotes } = useNotepad();
	return (
		<div className='w-[50%] h-[95%] bg-amber-900  pt-2 rounded-lg border-t-zinc-600 border-t-30 m-auto'>
			<div className='flex flex-col w-full m-auto bg-yellow-100 h-full gap-2   shadow-lg rounded-lg'>
				<Stickers setShowNotes={setShowNotes} setFilterCharacter={setFilterCharacter} />

				<div
					style={{
						background: `
			repeating-linear-gradient(
				to bottom,
				rgba(0,0,0,0.05) 0px,
				rgba(0,0,0,0.05) 1px,
				transparent 1px,
				transparent 24px
			)
		`
					}}
					className='p-2 overflow-y-auto flex flex-col gap-2 relative h-full '
				>
					{showNotes ? <NotesArea notes={notes} setNotes={setNotes} /> : filteredHistory.map((entry, index) => <Note key={index} entry={entry} />)}
				</div>
			</div>
		</div>
	);
}
