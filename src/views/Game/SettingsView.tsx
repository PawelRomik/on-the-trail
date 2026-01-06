import { useTranslation } from "react-i18next";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useChatContext } from "../../utils/context/chat-context/useChatContext";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import generateRandomCharacters from "../../utils/misc/generateRandomCharacters";
import SettingsModal from "../../components/settings/SettingsModal";
import SettingsActions from "../../components/settings/SettingsActions";
import LanguageSelect from "../../components/settings/LanguageSelect";
import VolumeSlider from "../../components/settings/VolumeSlider";
import { useStoryContext } from "../../utils/context/story-context/useStoryContext";

export default function SettingsView() {
	const { musicVolume, voiceVolume, language, setMusicVolume, setVoiceVolume, setLanguage, setGameStarted } = useSettings();
	const { resetStory } = useStoryContext();

	const { setActiveView } = useViewContext();
	const { setCharacters, setSelectedCharacter } = useCharactersContext();
	const { resetChats } = useChatContext();
	const { t } = useTranslation();

	const closeGame = () => {
		setGameStarted(false);
		setActiveView("game");
		resetStory();
	};

	const resetGame = () => {
		const characters = generateRandomCharacters();
		setCharacters(characters);
		setSelectedCharacter(null);
		resetChats(characters);
		setActiveView("game");
		resetStory();
	};

	return (
		<SettingsModal onClose={() => setActiveView("game")} title={t("settings.title")}>
			<h2 className='mb-2 border-b-2 border-red-800 text-white rounded-full text-center italic font-medium'>{t("settings.volume")}</h2>
			<VolumeSlider id='musicVolume' label={t("settings.musicVolume")} value={musicVolume} onChange={setMusicVolume} />

			<VolumeSlider id='voiceVolume' label={t("settings.voiceVolume")} value={voiceVolume} onChange={setVoiceVolume} />

			<LanguageSelect value={language} onChange={setLanguage} />

			<SettingsActions onBack={closeGame} onReset={resetGame} />
		</SettingsModal>
	);
}
