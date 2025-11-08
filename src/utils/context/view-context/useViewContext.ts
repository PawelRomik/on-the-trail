import { useContext } from "react";
import { ViewContext } from "./ViewProvider";

export function useViewContext() {
	const context = useContext(ViewContext);
	if (!context) throw new Error("useView must be used within a ViewProvider");
	return context;
}
