import { useTranslation } from "react-i18next";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import playSound from "../../utils/misc/playSound";
import { useSettings } from "../../utils/context/settings-context/useSettings";

type StickersProps = {
	setShowNotes: (val: boolean) => void;
	setFilterCharacter: (val: string | null | undefined) => void;
};

export default function Stickers({ setShowNotes, setFilterCharacter }: StickersProps) {
	const { characters } = useCharactersContext();
	const { t } = useTranslation();
	const { voiceVolume } = useSettings();

	const showNotes = () => {
		playSound("page_flip", voiceVolume);
		setShowNotes(true);
		setFilterCharacter(null);
	};

	const showAll = () => {
		playSound("page_flip", voiceVolume);
		setFilterCharacter(null);
		setShowNotes(false);
	};

	const showChar = (title: string) => {
		playSound("page_flip", voiceVolume);
		setFilterCharacter(title);
		setShowNotes(false);
	};

	return (
		<div className='w-full absolute h-[60px] -top-9 z-0 flex items-end gap-0'>
			<button
				className='h-12 min-w-20 px-3 cursor-pointer bg-yellow-300 text-white font-bold italic rounded-t-lg -translate-y-5 shadow-md ml-3 flex items-center justify-center'
				onClick={showNotes}
			>
				{t("notes.notes")}
			</button>

			<button
				className='h-12 min-w-20 px-3 cursor-pointer bg-blue-500 text-white font-bold italic rounded-t-lg -translate-y-5 shadow-md ml-3 flex items-center justify-center'
				onClick={showAll}
			>
				{t("notes.all")}
			</button>

			{characters.map((ch, index) => (
				<button
					key={ch.name}
					style={{ backgroundColor: ch.color }}
					className={`h-12 min-w-20 px-3 cursor-pointer text-white font-bold italic rounded-t-lg -translate-y-5 shadow-md ml-3 hover:bg-yellow-200 z-${
						10 + index
					} flex items-center justify-center`}
					onClick={() => showChar(ch.title)}
				>
					{t(`characters.ch${ch.id}.title`)}
				</button>
			))}
		</div>
	);
}
