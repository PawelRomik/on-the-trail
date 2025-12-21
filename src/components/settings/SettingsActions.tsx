import { useTranslation } from "react-i18next";

type SettingsActionsProps = {
	onBack: () => void;
	onReset: () => void;
};

export default function SettingsActions({ onBack, onReset }: SettingsActionsProps) {
	const { t } = useTranslation();

	return (
		<div className='flex justify-between pt-4'>
			<button className='px-4 py-2 bg-zinc-600 rounded-md hover:bg-zinc-700' onClick={onBack}>
				{t("settings.backToMenu")}
			</button>

			<button className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600' onClick={onReset}>
				{t("settings.resetGame")}
			</button>
		</div>
	);
}
