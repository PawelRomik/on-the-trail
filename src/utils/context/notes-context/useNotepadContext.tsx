import { useContext } from "react";
import { NotesContext } from "./NotesProvider";

export const useNotepad = () => {
	const context = useContext(NotesContext);
	if (!context) {
		throw new Error("useNotepad must be used within a NotepadProvider");
	}
	return context;
};
