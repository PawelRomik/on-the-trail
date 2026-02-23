import { useTranslation } from "react-i18next";
import { useStoryContext } from "../../utils/context/story-context/useStoryContext";

export default function Story() {
	const { location, intro } = useStoryContext();
	const { i18n, t } = useTranslation();
	const currentLanguage = i18n.language as "pl" | "en";

	return (
		<div className='text-white text-center bg-[rgba(0,0,0,0.8)] px-[10%] mb-5 py-3 text-sm gap-3 flex flex-col'>
			<h1 className='uppercase text-2xl md:text-4xl font-bold'>{t(`location.${location}`)}</h1>
			<h3 className='text-zinc-400 text-xs md:text-lg italic'>{intro?.[currentLanguage]}</h3>
		</div>
	);
}
