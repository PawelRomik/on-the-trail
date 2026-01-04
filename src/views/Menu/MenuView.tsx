import { useViewContext } from "../../utils/context/view-context/useViewContext";
import MenuSettingsView from "./MenuSettingsView";
import MenuMainView from "./MenuMainView";
import police from "../../../public/assets/background/police.jpg";
import MusicPlayer from "../../components/music-player/MusicPlayer";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import menuMusic from "../../assets/music/menu.mp3";

type MainMenuProps = {
	onStart: () => void;
};

export default function MenuView({ onStart }: MainMenuProps) {
	const { activeView } = useViewContext();
	const { musicVolume } = useSettings();

	return (
		<div style={{ backgroundImage: `url(${police})` }} className='w-screen h-screen bg-cover bg-center overflow-hidden'>
			<MusicPlayer src={menuMusic} volume={musicVolume} loop={true} muted={true} unmuteOnClick={true} />
			{activeView === "settings" ? <MenuSettingsView /> : <MenuMainView onStart={onStart} />}
		</div>
	);
}
