import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Game from "./views/Game/Game.tsx";
import ViewProvider from "./utils/context/view-context/ViewProvider.tsx";
import { CharactersProvider } from "./utils/context/character-context/CharactersProvider.tsx";
import { ChatProvider } from "./utils/context/chat-context/ChatProvider.tsx";
import { NotesProvider } from "./utils/context/notes-context/NotesProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ViewProvider>
			<CharactersProvider>
				<ChatProvider>
					<NotesProvider>
						<Game />
					</NotesProvider>
				</ChatProvider>
			</CharactersProvider>
		</ViewProvider>
	</StrictMode>
);
