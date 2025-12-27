import type { ReactNode } from "react";
import { CharactersProvider } from "./utils/context/character-context/CharactersProvider";
import { ChatProvider } from "./utils/context/chat-context/ChatProvider";
import { NotesProvider } from "./utils/context/notes-context/NotesProvider";
import ViewProvider from "./utils/context/view-context/ViewProvider";
import { SettingsProvider } from "./utils/context/settings-context/SettingsProvider";
import { StoryProvider } from "./utils/context/story-context/StoryProvider";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ViewProvider>
			<SettingsProvider>
				<CharactersProvider>
					<StoryProvider>
						<ChatProvider>
							<NotesProvider>{children}</NotesProvider>
						</ChatProvider>
					</StoryProvider>
				</CharactersProvider>
			</SettingsProvider>
		</ViewProvider>
	);
}
