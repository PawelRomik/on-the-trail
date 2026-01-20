import { useState, useCallback } from "react";
import { type CharacterType } from "../../types/CharacterType";
import { useTranslation } from "react-i18next";

export type CharacterStory = {
	name: string;
	story: string;
};

export type introType = {
	pl: string;
	en: string;
};

export type StoryResponse = {
	location: string;
	intro: introType;
	charactersStory: CharacterStory[];
};

export function useStory() {
	const [location, setLocation] = useState<string | null>(null);
	const [intro, setIntro] = useState<introType | null>(null);
	const { t } = useTranslation();
	const [charactersStory, setCharactersStory] = useState<CharacterStory[]>([]);

	const initStory = useCallback(
		async (inputCharacters: CharacterType[]) => {
			const payload = {
				characters: inputCharacters.map((c) => ({
					id: c.id,
					name: t(`names.${c.name}`) ?? `Character ${c.id}`,
					title: t(`characters.ch${c.id}.title`),
					age: c.age,
					gender: c.gender
				}))
			};

			const res = await fetch("/api/story", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});

			if (!res.ok) throw new Error("Nie udało się zainicjalizować historii");

			const data = await res.json();

			setLocation(data.location);
			setIntro(data.intro);

			const stories: CharacterStory[] = data.characters.map((char: CharacterType) => ({
				name: char.name,
				story: char.story
			}));
			setCharactersStory(stories);
		},
		[t]
	);

	const resetStory = useCallback(() => {
		setLocation(null);
		setIntro(null);
		setCharactersStory([]);
	}, []);

	return {
		location,
		intro,
		charactersStory,
		initStory,
		resetStory
	};
}
