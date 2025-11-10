import { useState } from "react";
import MenuView from "./views/Menu/MenuView";
import GameView from "./views/Game/GameView";

export default function App() {
	const [started, setStarted] = useState(false);

	return <>{started ? <GameView /> : <MenuView onStart={() => setStarted(true)} />}</>;
}
