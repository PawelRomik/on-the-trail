import { useTranslation } from "react-i18next";
import type { CharacterType } from "../../../types/CharacterType";
import StressMeter from "../../character/StressMeter";
import book from "../../../assets/ui/notes.png";
import { useViewContext } from "../../../utils/context/view-context/useViewContext";

type CharacterImageProps = {
	character: CharacterType;
	setHovered: (state: boolean) => void;
	onClick?: (c: CharacterType) => void;
};

export default function ChatCharacterImage({ character, onClick, setHovered }: CharacterImageProps) {
	const characterImage = `../assets/character/ch${character.id}.png`;
	const { t } = useTranslation();
	const { setActiveView } = useViewContext();

	const openNotepad = () => {
		setActiveView("notepad");
	};
	return (
		<div className='w-full h-full relative'>
			<div className='absolute top-5 right-[50%]  translate-x-[50%] w-full  items-center  justify-center flex flex-col'>
				<div className='w-[80%]'>
					<h2 className='text-white font-bold bangers bg-[rgba(0,0,0,0.5)] rounded-lg w-full text-center text-6xl text-shadow-lg/30  '>{t(`names.${character.name}`)}</h2>
					<StressMeter meter={character.stressMeter} />
				</div>
				<button
					style={{ backgroundImage: `url(${book})` }}
					onClick={openNotepad}
					className='h-[120px] w-[120px] bg-center cursor-pointer hover:brightness-150 hover:scale-105 transition bg-contain bg-no-repeat   absolute -left-[150px]'
				></button>
			</div>
			<img
				onClick={() => onClick?.(character)}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className={`hover:cursor-pointer h-[90%] right-0 absolute -bottom-5 scale-x-[-1] drop-shadow-[0px_-60px_59px_rgba(253,230,138,0.2)] ${
					character.stressMeter === 100 && "brightness-25"
				}`}
				src={characterImage}
				alt={t(`characters.ch${character.id}.title`)}
			/>
		</div>
	);
}
