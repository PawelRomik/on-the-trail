import { useState } from "react";
import { useChatContext } from "../../utils/context/chat-context/useChatContext";
import Notepad from "../../components/notepad/Notepad";

export default function NotepadView() {
	const { history } = useChatContext();

	const [filterCharacter, setFilterCharacter] = useState<string | null | undefined>(null);
	const [showNotes, setShowNotes] = useState(true);

	const filteredHistory = filterCharacter ? history.filter((entry) => entry.character.title === filterCharacter) : history;

	return <Notepad filterCharacter={filterCharacter} filteredHistory={filteredHistory} showNotes={showNotes} setShowNotes={setShowNotes} setFilterCharacter={setFilterCharacter} />;
}
