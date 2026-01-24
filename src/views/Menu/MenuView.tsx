import { useViewContext } from "../../utils/context/view-context/useViewContext";
import MenuSettingsView from "./MenuSettingsView";
import MenuMainView from "./MenuMainView";
import police from "/assets/background/police.jpg";

type MainMenuProps = {
	onStart: () => void;
};

export default function MenuView({ onStart }: MainMenuProps) {
	const { activeView } = useViewContext();

	return (
		<div style={{ backgroundImage: `url(${police})` }} className='w-screen h-screen bg-cover bg-center overflow-hidden'>
			{activeView === "settings" ? <MenuSettingsView /> : <MenuMainView onStart={onStart} />}
		</div>
	);
}
