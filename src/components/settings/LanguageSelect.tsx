import { useTranslation } from "react-i18next";

type LanguageSelectProps = {
	value: "pl" | "en";
	onChange: (value: "pl" | "en") => void;
};

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col'>
			<h2 className='mb-2 border-b-2 border-red-800 rounded-full text-center italic font-medium'>{t("settings.internationalization")}</h2>
			<label htmlFor='language' className='mb-2  rounded-full  italic font-medium'>
				{t("settings.language")}
			</label>
			<select
				id='language'
				value={value}
				onChange={(e) => onChange(e.target.value as "pl" | "en")}
				className='cursor-pointer p-2 border-2 focus:outline-0 focus:border-red-800 border-zinc-950 rounded-lg bg-[rgba(0,0,0,0.8)]'
			>
				<option className='text-white' value='en'>
					{t("settings.languages.en")}
				</option>
				<option className='text-white' value='pl'>
					{t("settings.languages.pl")}
				</option>
			</select>
		</div>
	);
}
