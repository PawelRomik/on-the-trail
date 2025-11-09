import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";

type StickersProps = {
	setShowNotes: (val: boolean) => void;
	setFilterCharacter: (val: string | null | undefined) => void;
};

export default function Stickers({ setShowNotes, setFilterCharacter }: StickersProps) {
	const { characters } = useCharactersContext();
	const { setActiveView } = useViewContext();

	const onClose = () => {
		setActiveView("game");
	};

	return (
		<div className='w-full relative h-[60px] flex items-end gap-0'>
			<button
				onClick={onClose}
				className='h-12 min-w-20 px-3 right-3 absolute cursor-pointer bg-yellow-300 rounded-t-lg -translate-y-5 shadow-md ml-3 flex items-center justify-center'
				title='Zamknij notatnik'
			>
				<i className='ri-arrow-go-back-fill'></i>
			</button>

			<button
				className='h-12 min-w-20 px-3 cursor-pointer bg-yellow-300 text-white font-bold italic rounded-t-lg -translate-y-5 shadow-md ml-3 flex items-center justify-center'
				onClick={() => {
					setShowNotes(true);
					setFilterCharacter(null);
				}}
			>
				Notes
			</button>

			<button
				className='h-12 min-w-20 px-3 cursor-pointer bg-blue-500 text-white font-bold italic rounded-t-lg -translate-y-5 shadow-md ml-3 flex items-center justify-center'
				onClick={() => {
					setFilterCharacter(null);
					setShowNotes(false);
				}}
			>
				All
			</button>

			{characters.map((ch, index) => (
				<button
					key={ch.name}
					style={{ backgroundColor: ch.color }}
					className={`h-12 min-w-20 px-3 cursor-pointer text-white font-bold italic rounded-t-lg -translate-y-5 shadow-md ml-3 hover:bg-yellow-200 z-${
						10 + index
					} flex items-center justify-center`}
					onClick={() => {
						setFilterCharacter(ch.name);
						setShowNotes(false);
					}}
				>
					{ch.title}
				</button>
			))}
		</div>
	);
}
