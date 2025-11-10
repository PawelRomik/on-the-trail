import type { ReactNode } from "react";
import { CharactersProvider } from "./utils/context/character-context/CharactersProvider";
import { ChatProvider } from "./utils/context/chat-context/ChatProvider";
import { NotesProvider } from "./utils/context/notes-context/NotesProvider";
import ViewProvider from "./utils/context/view-context/ViewProvider";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ViewProvider>
			<CharactersProvider>
				<ChatProvider>
					<NotesProvider>{children}</NotesProvider>
				</ChatProvider>
			</CharactersProvider>
		</ViewProvider>
	);
}
