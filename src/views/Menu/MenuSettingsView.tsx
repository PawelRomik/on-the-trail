import { useTranslation } from "react-i18next";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import SettingsModal from "../../components/settings/SettingsModal";
import LanguageSelect from "../../components/settings/LanguageSelect";
import VolumeSlider from "../../components/settings/VolumeSlider";

export default function MenuSettingsView() {
	const { musicVolume, voiceVolume, language, setMusicVolume, setVoiceVolume, setLanguage } = useSettings();

	const { setActiveView } = useViewContext();
	const { t } = useTranslation();

	return (
		<SettingsModal onClose={() => setActiveView("game")} title={t("settings.title")}>
			<VolumeSlider id='musicVolume' label={t("settings.musicVolume")} value={musicVolume} onChange={setMusicVolume} />

			<VolumeSlider id='voiceVolume' label={t("settings.voiceVolume")} value={voiceVolume} onChange={setVoiceVolume} />

			<LanguageSelect value={language} onChange={setLanguage} />
		</SettingsModal>
	);
}
