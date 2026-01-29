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
import paper from "../../assets/ui/paper.png";
import cover from "../../assets/ui/cover.png";

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
			<div style={{ backgroundImage: `url(${cover})` }} className='w-[60%] gap-px  caveat-regular h-[90%] p-2 z-10  relative border-t-0 rounded-lg m-auto flex glow-animate'>
				<Stickers showNotes={showNotes} filterCharacter={filterCharacter} setShowNotes={setShowNotes} setFilterCharacter={setFilterCharacter} />
				<div style={{ backgroundImage: `url(${paper})` }} className='flex brightness-110 flex-col flex-1 z-10 w-full m-auto g h-full gap-2   shadow-lg'>
					<div className='p-2 overflow-y-auto flex flex-col gap-2 relative h-full '>
						{showNotes ? <NotesArea notes={notes} setNotes={setNotes} /> : filteredHistory.map((entry, index) => <Note key={index} entry={entry} />)}
					</div>
				</div>
				<div style={{ backgroundImage: `url(${paper})` }} className=' flex scale-x-[-1] z-10 flex-col flex-1 w-full m-auto  h-full gap-2   shadow-lg'>
					<div className='p-2 scale-x-[-1] overflow-y-auto flex flex-col gap-2 relative h-full '>
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
											<p key={`behaviour-${i}`}>{t(`characters.ch${character.id}.behaviour`)}</p>
										))}

										{character.traits.buffs && character.traits.buffs.map((perkId) => <p key={`buff-${perkId}`}>+ {t(`characters.perks.buffs.${perkId}.desc`)}</p>)}

										{character.traits.nerfs && character.traits.nerfs.map((perkId) => <p key={`nerf-${perkId}`}>- {t(`characters.perks.nerfs.${perkId}.desc`)}</p>)}

										{character.traits.special && character.traits.special.map((perkId) => <p key={`special-${perkId}`}>* {t(`characters.perks.special.${perkId}.desc`)}</p>)}
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
