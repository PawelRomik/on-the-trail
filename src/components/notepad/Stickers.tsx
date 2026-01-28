import { useTranslation } from "react-i18next";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import playSound from "../../utils/misc/playSound";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import detective from "../../assets/character/detective.png";
import all from "../../assets/ui/all.png";

type StickersProps = {
	showNotes: boolean;
	filterCharacter: string | null | undefined;
	setShowNotes: (val: boolean) => void;
	setFilterCharacter: (val: string | null | undefined) => void;
};

const stickerClass = (active: boolean) =>
	`h-12 min-w-20 px-3 cursor-pointer text-white font-bold italic rounded-t-lg -translate-y-5 shadow-md ml-3 flex items-center justify-center ${
		active ? "bg-purple-700 h-16" : "bg-purple-800 "
	}`;

export default function Stickers({ showNotes, filterCharacter, setShowNotes, setFilterCharacter }: StickersProps) {
	const { characters } = useCharactersContext();
	const { t } = useTranslation();
	const { voiceVolume } = useSettings();

	const getCharacterImage = (id: number) => `../assets/character/ch${id}.png`;

	const showNotesHandler = () => {
		playSound("page_flip", voiceVolume);
		setShowNotes(true);
		setFilterCharacter(null);
	};

	const showAllHandler = () => {
		playSound("page_flip", voiceVolume);
		setFilterCharacter(null);
		setShowNotes(false);
	};

	const showCharHandler = (title: string) => {
		playSound("page_flip", voiceVolume);
		setFilterCharacter(title);
		setShowNotes(false);
	};

	return (
		<div className='w-full absolute h-[60px] -top-9 z-0 flex items-end'>
			<button onClick={showNotesHandler} className={stickerClass(showNotes)}>
				<img src={detective} alt={t("notes.notes")} className='h-10 w-10 object-contain rounded-full' />
			</button>

			<button onClick={showAllHandler} className={stickerClass(!showNotes && !filterCharacter)}>
				<img src={all} alt={t("notes.all")} className='h-10 w-10 object-contain rounded-full' />
			</button>

			{characters.map((ch, index) => (
				<button key={ch.name} onClick={() => showCharHandler(ch.title)} className={`${stickerClass(filterCharacter === ch.title)} z-${10 + index}`}>
					<img src={getCharacterImage(ch.id)} alt={t(`characters.ch${ch.id}.title`)} className='h-10 w-10 object-contain rounded-full' />
				</button>
			))}
		</div>
	);
}
