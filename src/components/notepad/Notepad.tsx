import { useNotepad } from "../../utils/context/notes-context/useNotepadContext";
import type { HistoryEntry } from "../../utils/hooks/useChat";
import Note from "./Note";
import NotesArea from "./NotesArea";
import Stickers from "./Stickers";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import detective from "../../../src/assets/character/detective.png";
import { useStoryContext } from "../../utils/context/story-context/useStoryContext";
import { useTranslation } from "react-i18next";
import { useViewContext } from "../../utils/context/view-context/useViewContext";

type NotepadProps = {
	filteredHistory: HistoryEntry[];
	showNotes: boolean;
	setShowNotes: (val: boolean) => void;
	setFilterCharacter: (val: string | null | undefined) => void;
	filterCharacter: string | null | undefined;
};

export default function Notepad({ filteredHistory, filterCharacter, showNotes, setShowNotes, setFilterCharacter }: NotepadProps) {
	const { notes, setNotes } = useNotepad();
	const { characters } = useCharactersContext();
	const character = characters.find((c) => c.title === filterCharacter) || characters[0];
	const { intro, location } = useStoryContext();
	const isPlayerView = showNotes;
	const isNoCharacterSelected = !showNotes && !filterCharacter;
	const isCharacterView = !showNotes && !!filterCharacter;
	const { t, i18n } = useTranslation();
	const { setActiveView, lastView } = useViewContext();
	const currentLanguage = i18n.language as "pl" | "en";

	const closeNotes = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
		if (e.target === e.currentTarget) {
			setActiveView(lastView ? lastView : "game");
		}
	};

	const displayedImage = isPlayerView ? detective : isNoCharacterSelected ? `../assets/background/${location}.jpg` : `../assets/character/ch${character.id}.png`;

	const displayedTitle = isPlayerView ? t("notes.you") : isNoCharacterSelected ? t("notes.case") : t(`characters.ch${character.id}.title`);

	return (
		<div onClick={(e) => closeNotes(e)} className='w-full relative h-full flex items-center justify-center pt-5 bg-[rgba(0,0,0,0.8)]'>
			<button onClick={(e) => closeNotes(e)} className='hover:text-purple-400 transition absolute top-0 right-0 text-3xl cursor-pointer text-white p-3'>
				<i className='ri-close-circle-line pointer-events-none'></i>
			</button>
			<div className='w-[60%] caveat-regular h-[90%] z-10 border-black border-5 relative border-t-0 rounded-lg m-auto flex shadow-[0_0_20px_rgba(128,0,128,0.7)]'>
				<Stickers setShowNotes={setShowNotes} setFilterCharacter={setFilterCharacter} />
				<div className='flex flex-col flex-1 z-10 w-full m-auto bg-zinc-100 h-full gap-2   shadow-lg rounded-lg'>
					<div
						style={{
							background: `
			repeating-linear-gradient(
				to bottom,
				rgba(0,0,0,0.05) 0px,
				rgba(0,0,0,0.05) 1px,
				transparent 1px,
				transparent 24px
			)
		`
						}}
						className='p-2 overflow-y-auto flex flex-col gap-2 relative h-full '
					>
						{showNotes ? <NotesArea notes={notes} setNotes={setNotes} /> : filteredHistory.map((entry, index) => <Note key={index} entry={entry} />)}
					</div>
				</div>
				<div className='flex z-10 flex-col flex-1 w-full m-auto bg-zinc-200 h-full gap-2   shadow-lg rounded-lg'>
					<div
						style={{
							background: `
			repeating-linear-gradient(
				to bottom,
				rgba(0,0,0,0.05) 0px,
				rgba(0,0,0,0.05) 1px,
				transparent 1px,
				transparent 24px
			)
		`
						}}
						className='p-2 overflow-y-auto flex flex-col gap-2 relative h-full '
					>
						<div className='flex flex-col justify-center w-full h-full text-center gap-4'>
							<div className='w-[270px] shadow-lg bg-[rgba(255,255,0,0.2)] flex mx-auto  items-center justify-center border-8 border-white -rotate-8'>
								<img src={displayedImage} className='h-full w-full' />
							</div>

							<h2 className='italic text-4xl underline'>{displayedTitle}</h2>

							{isPlayerView && (
								<ul className='list-disc text-left pl-6 space-y-2'>
									<li className='italic text-lg'>{t("notes.tipOne")}</li>
									<li className='italic text-lg'>{t("notes.tipTwo")}</li>
									<li className='italic text-lg'>{t("notes.tipThree")}</li>
								</ul>
							)}

							{isNoCharacterSelected && (
								<div className='flex-col'>
									<p className='italic text-3xl px-6 leading-relaxed'>
										{t("story.location")}: {t(`location.${location}`)}
									</p>
									<p className='italic text-xl px-6 leading-relaxed'>{intro?.[currentLanguage]}</p>
								</div>
							)}

							{isCharacterView && (
								<>
									<div className='flex flex-col gap-1 italic'>
										<div className='w-[220px] h-5 border-2 border-black mx-auto overflow-hidden'>
											<div
												className='h-full'
												style={{
													width: `${character.stressMeter}%`,
													backgroundImage: "repeating-linear-gradient(110deg, black 0px, black 6px, transparent 3px, transparent 8px)"
												}}
											/>
										</div>
										<span className='text-xl'>{t("ui.stress", { amount: character.stressMeter })}</span>
									</div>

									<div className='flex text-xl italic flex-col gap-2'>
										<p>
											{t("notes.age")}: {t("ui.age", { age: character.age })}
										</p>
										<p>
											{t("notes.sex")}: {character.gender ? t("ui.male") : t("ui.female")}
										</p>
									</div>

									<div className='flex flex-col text-xl gap-2 italic'>
										{character.traits.behaviour.map((_, i) => (
											<p key={`behaviour-${i}`}>{t(`characters.ch${character.id}.traits.behaviour`)}</p>
										))}

										{character.traits.buffs.map((_, i) => (
											<p key={`buff-${i}`}>+ {t(`characters.ch${character.id}.traits.buffs.${i}`)}</p>
										))}

										{character.traits.nerfs.map((_, i) => (
											<p key={`nerf-${i}`}>- {t(`characters.ch${character.id}.traits.nerfs.${i}`)}</p>
										))}
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
