import { useTranslation } from "react-i18next";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import detective from "../../assets/character/detective.png";
import all from "../../assets/ui/all.png";
import type { FlipBookRef } from "./Book";
import { useEffect } from "react";

type StickersProps = {
	bookRef: FlipBookRef;
	page: number;
};

const stickerClass = (active: boolean) =>
	`h-12 min-w-20 px-3 cursor-pointer text-white font-bold italic rounded-t-lg -translate-y-5 shadow-md ml-3 flex items-center justify-center ${
		active ? "bg-purple-700 h-16" : "bg-purple-800 "
	}`;

export default function Stickers({ bookRef, page }: StickersProps) {
	const { characters } = useCharactersContext();
	const { t } = useTranslation();

	const getCharacterImage = (id: number) => `../assets/character/ch${id}.png`;

	useEffect(() => {
		console.log(page);
	}, [page]);

	const showNotesHandler = () => {
		bookRef.current?.pageFlip().flip(0, "bottom");
	};

	const showAllHandler = () => {
		bookRef.current?.pageFlip().flip(2, "bottom");
	};

	const showCharHandler = (index: number) => {
		bookRef.current?.pageFlip().flip(4 + index * 2, "bottom");
	};

	return (
		<div className='w-full absolute h-[60px] -top-9 z-0 flex items-end'>
			<button onClick={showNotesHandler} className={stickerClass(page < 2)}>
				<img src={detective} alt={t("notes.notes")} className='h-10 w-10 object-contain rounded-full' />
			</button>

			<button onClick={showAllHandler} className={stickerClass(page >= 2 && page < 4)}>
				<img src={all} alt={t("notes.all")} className='h-10 w-10 object-contain rounded-full' />
			</button>

			{characters.map((ch, index) => (
				<button key={ch.name} onClick={() => showCharHandler(index)} className={`${stickerClass(page == 4 + index * 2)} z-${10 + index}`}>
					<img src={getCharacterImage(ch.id)} alt={t(`characters.ch${ch.id}.title`)} className='h-10 w-10 object-contain rounded-full' />
				</button>
			))}
		</div>
	);
}
