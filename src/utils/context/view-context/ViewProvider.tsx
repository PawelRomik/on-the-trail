import { createContext, useState } from "react";
import { type ReactNode } from "react";

type ViewType = "game" | "character" | "book" | "settings";
type ViewContextType = {
	activeView: ViewType;
	lastView: ViewType | null;
	setActiveView: (view: ViewType) => void;
	knifeActive: boolean;
	setKnifeActive: React.Dispatch<React.SetStateAction<boolean>>;
	musicMode: MusicMode;
	setMusicMode: (music: MusicMode) => void;
};

type MusicMode = "game" | "gameover" | "menu";

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export default function ViewProvider({ children }: { children: ReactNode }) {
	const [activeView, setActiveViewState] = useState<ViewType>("game");
	const [knifeActive, setKnifeActive] = useState<boolean>(false);
	const [lastView, setLastView] = useState<ViewType | null>(null);
	const [musicMode, setMusicMode] = useState<MusicMode>("menu");

	const setActiveView = (view: ViewType) => {
		setLastView(activeView);
		setActiveViewState(view);
		setKnifeActive(false);
	};

	return <ViewContext.Provider value={{ activeView, knifeActive, setKnifeActive, lastView, setActiveView, musicMode, setMusicMode }}>{children}</ViewContext.Provider>;
}

export { ViewContext };
