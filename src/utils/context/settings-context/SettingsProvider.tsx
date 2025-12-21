import { createContext, useState, type ReactNode } from "react";
import i18n from "i18next";

type SettingsContextType = {
	musicVolume: number;
	setMusicVolume: (value: number) => void;
	voiceVolume: number;
	setVoiceVolume: (value: number) => void;
	language: "pl" | "en";
	setLanguage: (lang: "pl" | "en") => void;
	gameStarted: boolean;
	setGameStarted: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [musicVolume, setMusicVolumeState] = useState<number>(() => {
		const saved = localStorage.getItem("musicVolume");
		return saved ? Number(saved) : 50;
	});

	const [voiceVolume, setVoiceVolumeState] = useState<number>(() => {
		const saved = localStorage.getItem("voiceVolume");
		return saved ? Number(saved) : 50;
	});

	const [gameStarted, setGameStarted] = useState(false);

	const [language, setLanguageState] = useState<"pl" | "en">((localStorage.getItem("userLocale") as "pl" | "en") || "pl");

	const setMusicVolume = (value: number) => {
		setMusicVolumeState(value);
		localStorage.setItem("musicVolume", value.toString());
	};

	const setVoiceVolume = (value: number) => {
		setVoiceVolumeState(value);
		localStorage.setItem("voiceVolume", value.toString());
	};

	const setLanguage = (lang: "pl" | "en") => {
		setLanguageState(lang);
		i18n.changeLanguage(lang);
		localStorage.setItem("userLocale", lang);
	};

	return (
		<SettingsContext.Provider
			value={{
				musicVolume,
				setMusicVolume,
				voiceVolume,
				setVoiceVolume,
				language,
				setLanguage,
				gameStarted,
				setGameStarted
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export { SettingsContext };
