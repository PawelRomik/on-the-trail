import { useTranslation } from "react-i18next";

export default function NotesArea({ notes, setNotes }: { notes: string; setNotes: (val: string) => void }) {
	const { t } = useTranslation();
	return (
		<textarea
			className='w-full h-full overflow-y-auto text-2xl p-4 rounded-md focus:border-0 focus:outline-0 resize-none shadow-inner placeholder-gray-500
			caret-black  leading-[1.6] whitespace-pre-line
			bg-[repeating-linear-gradient(to bottom,rgba(0,0,0,0.05) 0,rgba(0,0,0,0.05) 1px,transparent 1px,transparent 24px)]'
			value={notes}
			onChange={(e) => setNotes(e.target.value)}
			placeholder={t("notes.writeNote")}
		/>
	);
}
