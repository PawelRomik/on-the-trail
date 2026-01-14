import ReactConfetti from "react-confetti";
import stone from "../../assets/ui/stone.png";
import { useCharactersContext } from "../../utils/context/character-context/useCharacterContext";
import { useChatContext } from "../../utils/context/chat-context/useChatContext";
import { useSettings } from "../../utils/context/settings-context/useSettings";
import { useStoryContext } from "../../utils/context/story-context/useStoryContext";
import { useViewContext } from "../../utils/context/view-context/useViewContext";
import generateRandomCharacters from "../../utils/misc/generateRandomCharacters";

export default function EndScreen() {
	const { characters, selectedCharacter, setCharacters, setSelectedCharacter } = useCharactersContext();
	const { setGameStarted } = useSettings();
	const { resetStory } = useStoryContext();
	const { setActiveView, setKnifeActive } = useViewContext();
	const { resetChats } = useChatContext();
	const culprit = characters.find((c) => c.traitor);
	if (!culprit || !selectedCharacter) return;
	const characterImage = `../assets/character/ch${selectedCharacter.id}.png`;
	const culpritImage = `../assets/character/ch${culprit.id}.png`;
	const state = culprit.title === selectedCharacter?.title;

	const closeGame = () => {
		setGameStarted(false);
		setActiveView("game");
		resetStory();
		setKnifeActive(false);
	};

	const resetGame = () => {
		const characters = generateRandomCharacters();
		setCharacters(characters);
		setSelectedCharacter(null);
		resetChats(characters);
		setActiveView("game");
		setKnifeActive(false);
		resetStory();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
			{state && <ReactConfetti colors={["#991B1B"]} />}
			<div style={{ backgroundImage: `url(${stone})` }} className='shadow-red-900  relative w-full bg-size-[100%] max-w-3xl  text-white p-6 rounded-2xl shadow-md space-y-6'>
				<h1 className='text-3xl border-b-2 border-red-800 pb-2 bg-[rgba(0,0,0,0.4)] border-t-0 rounded-full w-auto font-bold text-center'>{state ? "YOU WIN" : "YOU LOSE!"}</h1>

				<div className='flex w-full items-center justify-center gap-3'>
					<div className='flex-1 gap-2 relative flex flex-col items-center justify-center'>
						<p className='border-b-3 rounded-full px-3 border-red-800 text-3xl font-bold italic'>YOUR PICK</p>
						<img src={characterImage} className=' bg-[rgba(0,0,0,0.9)] grayscale-100 border-4 border-zinc-950' />
						<div className='absolute bg-[rgba(0,0,0,0.7)] text-center py-3 italic w-full bottom-0 text-3xl'>R.I.P.</div>
					</div>
					<div className='flex-1 flex relative gap-2 flex-col items-center justify-center'>
						<p className='border-b-3 rounded-full px-3 border-red-800 text-3xl font-bold italic'>CULPRIT</p>
						<img src={culpritImage} className={`bg-[rgba(0,0,0,0.9)] border-4 ${state && "grayscale-100"} border-zinc-950`} />
						{state && <div className='absolute bg-[rgba(0,0,0,0.7)] text-center py-3 italic w-full bottom-0 text-3xl'>R.I.P.</div>}
					</div>
				</div>
				<div className='flex items-center justify-center gap-3 text-xl font-bold'>
					<button
						onClick={resetGame}
						className='px-6 py-2 cursor-pointer  bg-[rgba(0,0,0,0.5)]  border-b-2 border-red-800  rounded-xl transition hover:brightness-200 hover:-translate-y-0.5'
					>
						Restart
					</button>
					<button
						onClick={closeGame}
						className='px-6 py-2 cursor-pointer  bg-[rgba(0,0,0,0.5)]  border-b-2 border-red-800  rounded-xl transition hover:brightness-200 hover:-translate-y-0.5'
					>
						Quit
					</button>
				</div>
			</div>
		</div>
	);
}
