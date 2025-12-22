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
	const { setActiveView } = useViewContext();

	const startGame = () => {
		playSound("button_press", voiceVolume);
		onStart();
	};
	return (
		<div className='flex flex-col z-10 gap-5 h-[40%] justify-start'>
			<button onClick={startGame} className='px-8 py-3 w-[300px] bg-zinc-600 hover:cursor-pointer hover:bg-red-600 rounded-2xl text-xl font-semibold transition'>
				{t("menu.start")}
			</button>
			<button
				onClick={() => setActiveView("settings")}
				className='px-8 py-3 w-[300px] bg-zinc-600 hover:cursor-pointer hover:bg-red-600 rounded-2xl text-xl font-semibold transition'
			>
				{t("menu.settings")}
			</button>
		</div>
	);
}
