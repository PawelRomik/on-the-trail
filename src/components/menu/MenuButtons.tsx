import { useTranslation } from "react-i18next";
import playSound from "../../utils/misc/playSound";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import { useViewContext } from "../../utils/context/view-context/useViewContext";

type MenuButtonsProps = {
	onStart: () => void;
};

export default function MenuButtons({ onStart }: MenuButtonsProps) {
	const { t } = useTranslation();
	const { voiceVolume } = useSettings();
	const { setActiveView, setMusicMode } = useViewContext();

	const startGame = () => {
		playSound("button_press", voiceVolume);
		onStart();
		setMusicMode("game");
	};

	const openMenu = () => {
		playSound("button_press", voiceVolume);
		setActiveView("settings");
	};

	return (
		<div className='flex flex-col z-10 gap-10 h-[40%] justify-start items-center'>
			<button
				onClick={startGame}
				className='px-8 py-2 md:py-3 md:w-[300px] w-[200px] bg-[rgba(0,0,0,0.4)]  border-b-red-800 border-b-2 rounded-2xl hover:cursor-pointer hover:-translate-y-1 hover:brightness-200  text-xl font-semibold transition'
			>
				{t("menu.start")}
			</button>
			<button
				onClick={openMenu}
				className='px-8 py-3 md:w-[300px] w-[200px] bg-[rgba(0,0,0,0.4)]  border-b-red-800 border-b-2 rounded-2xl hover:cursor-pointer hover:-translate-y-1 hover:brightness-200  text-xl font-semibold transition'
			>
				{t("menu.settings")}
			</button>
		</div>
	);
}
