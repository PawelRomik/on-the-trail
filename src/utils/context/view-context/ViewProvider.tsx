import { createContext, useState } from "react";
import { type ReactNode } from "react";

type ViewType = "game" | "character" | "notepad" | "settings";
type ViewContextType = { activeView: ViewType; setActiveView: (view: ViewType) => void };

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export default function ViewProvider({ children }: { children: ReactNode }) {
	const [activeView, setActiveView] = useState<ViewType>("game");

	return <ViewContext.Provider value={{ activeView, setActiveView }}>{children}</ViewContext.Provider>;
}

export { ViewContext };
