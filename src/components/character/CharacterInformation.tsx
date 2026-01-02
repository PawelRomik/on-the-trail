import { useTranslation } from "react-i18next";

export default function CharacterInformation({ age, gender }: { age: number | number[]; gender: boolean }) {
	const { t } = useTranslation();
	return (
		<div className='bangers text-2xl font-bold flex px-3 py-2 gap-3 w-full justify-around text-stroke-3 text-white'>
			<p className='px-3 flex-1  rounded-full border-b-2 border-red-900  flex items-center justify-center '>{t("ui.age", { age: age })}</p>
			<p className='px-3 rounded-full flex-1 border-b-2 border-red-900  flex items-center justify-center '>
				{gender ? (
					<>
						<i className='ri-men-line text-blue-500' />
						<span>{t(`ui.male`)}</span>
					</>
				) : (
					<>
						<i className='ri-women-line text-pink-400' />
						<span>{t(`ui.female`)}</span>
					</>
				)}
			</p>
		</div>
	);
}
