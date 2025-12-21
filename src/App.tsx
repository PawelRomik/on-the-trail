import MenuView from "./views/Menu/MenuView";
import GameView from "./views/Game/GameView";
import { useSettings } from "./utils/context/settings-context/useSettings";

export default function App() {
	const { gameStarted, setGameStarted } = useSettings();

	return <>{gameStarted ? <GameView /> : <MenuView onStart={() => setGameStarted(true)} />}</>;
}
