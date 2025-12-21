import { useTranslation } from "react-i18next";

type LanguageSelectProps = {
	value: "pl" | "en";
	onChange: (value: "pl" | "en") => void;
};

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
	const { t } = useTranslation();

	return (
		<div className='flex flex-col'>
			<label htmlFor='language' className='mb-2 font-medium'>
				{t("settings.language")}
			</label>
			<select id='language' value={value} onChange={(e) => onChange(e.target.value as "pl" | "en")} className='cursor-pointer p-2 border rounded-md'>
				<option className='text-black' value='en'>
					{t("settings.languages.en")}
				</option>
				<option className='text-black' value='pl'>
					{t("settings.languages.pl")}
				</option>
			</select>
		</div>
	);
}
