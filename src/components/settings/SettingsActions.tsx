import { useTranslation } from "react-i18next";
import playSound from "../../utils/misc/playSound";
import { useSettings } from "../../utils/context/settings-context/useSettings";

type SettingsActionsProps = {
	onBack: () => void;
	onReset: () => void;
};

export default function SettingsActions({ onBack, onReset }: SettingsActionsProps) {
	const { t } = useTranslation();
	const { voiceVolume } = useSettings();

	const backToMenu = () => {
		playSound("button_press", voiceVolume);
		onBack();
	};

	const resetGame = () => {
		playSound("button_press", voiceVolume);
		onReset();
	};

	return (
		<div className='flex justify-between pt-4'>
			<button className='px-4 py-2 cursor-pointer bg-zinc-600 rounded-md hover:bg-zinc-700' onClick={backToMenu}>
				{t("settings.backToMenu")}
			</button>

			<button className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600' onClick={resetGame}>
				{t("settings.resetGame")}
			</button>
		</div>
	);
}
