import { useTranslation } from "react-i18next";

import { useStoryContext } from "../../../utils/context/story-context/useStoryContext";
import React from "react";

const StoryPage = React.forwardRef<HTMLDivElement>((_, ref) => {
	const { intro, location } = useStoryContext();
	const { t, i18n } = useTranslation();
	const currentLanguage = i18n.language as "pl" | "en";

	return (
		<div ref={ref} className='paper-bg h-full w-full p-4 overflow-y-auto flex flex-col brightness-110'>
			<div className='flex flex-col justify-center w-full h-full text-center gap-4'>
				<div className='w-[270px] shadow-lg bg-[rgba(255,255,0,0.2)] flex mx-auto items-center justify-center border-8 border-white -rotate-8'>
					<img src={`../assets/background/${location}.jpg`} className='h-full w-full' />
				</div>

				<h2 className='italic text-4xl underline'>{t("notes.case")}</h2>

				<div className='flex-col'>
					<p className='italic text-3xl px-6 leading-relaxed'>
						{t("story.location")}: {t(`location.${location}`)}
					</p>
					<p className='italic text-xl px-6 leading-relaxed'>{intro?.[currentLanguage]}</p>
				</div>
			</div>
		</div>
	);
});

export default StoryPage;
