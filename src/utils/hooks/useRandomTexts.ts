import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const getRandomText = (texts: string[]) => {
	return texts[Math.floor(Math.random() * texts.length)];
};

export const useRandomTexts = () => {
	const [loadingText, setLoadingText] = useState("");
	const [tipText, setTipText] = useState("");
	const { t } = useTranslation();

	useEffect(() => {
		const loadingTexts = [t("loading.text1"), t("loading.text2"), t("loading.text3"), t("loading.text4"), t("loading.text5")];

		const tipTexts = [t("notes.tipOne"), t("notes.tipTwo"), t("notes.tipThree")];

		setLoadingText(getRandomText(loadingTexts));
		setTipText(getRandomText(tipTexts));

		const changeLoadingText = () => {
			setLoadingText(getRandomText(loadingTexts));
			const randomDelay = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
			loadingTimer = setTimeout(changeLoadingText, randomDelay);
		};

		const changeTipText = () => {
			setTipText(getRandomText(tipTexts));
			const randomDelay = Math.floor(Math.random() * (12000 - 7000 + 1)) + 7000;
			tipTimer = setTimeout(changeTipText, randomDelay);
		};

		let loadingTimer = setTimeout(changeLoadingText, Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000);
		let tipTimer = setTimeout(changeTipText, Math.floor(Math.random() * (12000 - 7000 + 1)) + 7000);

		return () => {
			clearTimeout(loadingTimer);
			clearTimeout(tipTimer);
		};
	}, [t]);

	return { loadingText, tipText };
};
