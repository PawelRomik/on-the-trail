import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Game from "./views/Game/Game.tsx";
import Providers from "./providers.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers>
			<Game />
		</Providers>
	</StrictMode>
);
