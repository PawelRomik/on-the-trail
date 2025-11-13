import { useTranslation } from "react-i18next";

export default function CharacterInformation({ age, gender }: { age: number | number[]; gender: boolean }) {
	const { t } = useTranslation();
	return (
		<div className='bangers text-2xl font-bold flex px-3 py-2 gap-3 w-full text-stroke-3 text-white'>
			<p className='flex-1 shadow flex items-center  justify-center bg-zinc-800'>{t("ui.age", { age: age })}</p>
			<p className='flex-2  shadow flex items-center justify-center bg-zinc-800'>
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
