import React from "react";
import detective from "../../../../src/assets/character/detective.png";
import { useTranslation } from "react-i18next";

const DetectivePage = React.forwardRef<HTMLDivElement>((_, ref) => {
	const { t } = useTranslation();
	return (
		<div ref={ref} className='h-full paper-bg w-full p-4 overflow-y-auto flex flex-col '>
			<div className='flex flex-col justify-center w-full h-full text-center gap-4'>
				<div className='w-[270px] shadow-lg bg-[rgba(255,255,0,0.1)] flex mx-auto items-center justify-center border-8 border-white -rotate-10'>
					<img src={detective} className='h-full w-full' />
				</div>

				<h2 className='italic text-4xl underline'>{t("notes.you")}</h2>

				<ul className='list-disc text-left pl-6 space-y-2'>
					<li className='italic text-lg'>{t("notes.tipOne")}</li>
					<li className='italic text-lg'>{t("notes.tipTwo")}</li>
					<li className='italic text-lg'>{t("notes.tipThree")}</li>
				</ul>
			</div>
		</div>
	);
});

export default DetectivePage;
