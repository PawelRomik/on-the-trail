import { createContext, useState } from "react";
import { type ReactNode } from "react";

type NotesContextType = {
	notes: string;
	setNotes: (text: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
	const [notes, setNotes] = useState("");

	return <NotesContext.Provider value={{ notes, setNotes }}>{children}</NotesContext.Provider>;
};

export { NotesContext };
