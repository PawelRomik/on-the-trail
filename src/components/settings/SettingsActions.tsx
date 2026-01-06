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
			<button
				className='px-4 py-2 cursor-pointer  bg-[rgba(0,0,0,0.5)]  border-b-2 border-red-800  rounded-xl transition hover:brightness-200 hover:-translate-y-0.5'
				onClick={backToMenu}
			>
				<span className='gap-1 flex'>
					<i className='ri-door-open-line text-red-800'></i>
					{t("settings.backToMenu")}
				</span>
			</button>

			<button className='px-4 py-2 cursor-pointer bg-[rgba(255,0,0,0.5)]  border-b-2 border-red-800  rounded-xl hover:brightness-200 hover:-translate-y-0.5 ' onClick={resetGame}>
				<span className='gap-1 flex'>
					<i className='ri-reset-right-line text-white'></i>
					{t("settings.resetGame")}
				</span>
			</button>
		</div>
	);
}
